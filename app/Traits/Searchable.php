<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Searchable
{
    /**
     * Scope a query to search/filter based on given filters.
     *
     * @param Builder $query
     * @param array $filters
     * @return Builder
     */
    public function scopeSearch(Builder $query, array $filters): Builder
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $hasRelationSearch = false;
                
                // First, collect all relation-based searches
                $relationSearches = [];
                foreach ($this->getSearchableColumns() as $column) {
                    if (str_contains($column, '.')) {
                        $hasRelationSearch = true;
                        $relationSearches[] = $column;
                    } else {
                        $query->orWhere($column, 'like', "%{$search}%");
                    }
                }
                
                // Then apply relation searches with proper grouping
                if ($hasRelationSearch) {
                    foreach ($relationSearches as $column) {
                        $query->orWhere(function ($q) use ($column, $search) {
                            $this->applyRelationSearch($q, $column, $search);
                        });
                    }
                }
            });
        });

        foreach ($this->getFilterableColumns() as $column) {
            $query->when($filters[$column] ?? null, function ($query, $value) use ($column) {
                if ($value !== 'all') {
                    $query->where($column, $value);
                }
            });
        }

        foreach ($this->getDateFilterableColumns() as $column) {
            $query->when($filters["{$column}_from"] ?? null, function ($query, $date) use ($column) {
                $query->whereDate($column, '>=', $date);
            });

            $query->when($filters["{$column}_to"] ?? null, function ($query, $date) use ($column) {
                $query->whereDate($column, '<=', $date);
            });
        }

        return $query;
    }

    /**
     * Apply search on a relation.
     */
    protected function applyRelationSearch(Builder $query, string $column, string $search): void
    {
        $parts = explode('.', $column);
        $relation = array_shift($parts);
        $relColumn = implode('.', $parts);

        $query->whereHas($relation, function ($query) use ($relColumn, $search) {
            if (str_contains($relColumn, '.')) {
                $this->applyRelationSearch($query, $relColumn, $search);
            } else {
                $query->where($relColumn, 'like', "%{$search}%");
            }
        });
    }

    /**
     * Get searchable columns. Default to empty array.
     */
    protected function getSearchableColumns(): array
    {
        return $this->searchableColumns ?? [];
    }

    /**
     * Get filterable columns. Default to empty array.
     */
    protected function getFilterableColumns(): array
    {
        return $this->filterableColumns ?? [];
    }

    /**
     * Get date filterable columns. Default to empty array.
     */
    protected function getDateFilterableColumns(): array
    {
        return $this->dateFilterableColumns ?? [];
    }
}
