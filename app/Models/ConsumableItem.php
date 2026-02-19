<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ConsumableItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'description',
        'category',
        'quantity',
        'min_stock',
        'unit',
        'location',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'min_stock' => 'integer',
    ];

    public function consumableBorrowings(): HasMany
    {
        return $this->hasMany(ConsumableBorrowing::class);
    }

    /**
     * Accessor to get name with SKU
     */
    public function nameWithSku(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->sku ? "{$this->name} ({$this->sku})" : $this->name,
        );
    }

    /**
     * Get the available stock of the consumable item
     */
    public function getAvailableStockAttribute(): int
    {
        return max(0, $this->quantity);
    }

    /**
     * Check if stock is low
     */
    public function getIsLowStockAttribute(): bool
    {
        return $this->quantity <= $this->min_stock;
    }

    /**
     * Scope for low stock items
     */
    public function scopeLowStock($query)
    {
        return $query->whereColumn('quantity', '<=', 'min_stock');
    }

    /**
     * Scope for active items (has stock)
     */
    public function scopeInStock($query)
    {
        return $query->where('quantity', '>', 0);
    }
}
