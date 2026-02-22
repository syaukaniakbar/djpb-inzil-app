import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Filter, X, Calendar, ArrowRight } from 'lucide-react';

interface FilterOption {
    label: string;
    value: string;
}

interface SearchFilterProps {
    baseUrl: string;
    filters?: {
        search?: string;
        status?: string;
        [key: string]: any;
    };
    placeholder?: string;
    statusOptions?: FilterOption[];
    dateFieldPrefix?: string;
}

export default function SearchFilter({
    baseUrl,
    filters = {},
    placeholder = 'Search...',
    statusOptions = [],
    dateFieldPrefix = 'start_at',
}: SearchFilterProps) {
    const dateFromKey = `${dateFieldPrefix}_from`;
    const dateToKey = `${dateFieldPrefix}_to`;

    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [dateFrom, setDateFrom] = useState(filters[dateFromKey] || '');
    const [dateTo, setDateTo] = useState(filters[dateToKey] || '');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                applyFilters({
                    ...filters,
                    search,
                    status,
                    [dateFromKey]: dateFrom,
                    [dateToKey]: dateTo
                });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const applyFilters = (newFilters: any) => {
        router.get(baseUrl, newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        applyFilters({ ...filters, search, status: value, [dateFromKey]: dateFrom, [dateToKey]: dateTo });
    };

    const handleDateChange = (from: string, to: string) => {
        setDateFrom(from);
        setDateTo(to);
        applyFilters({ ...filters, search, status, [dateFromKey]: from, [dateToKey]: to });
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        setDateFrom('');
        setDateTo('');
        applyFilters({ search: '', status: 'all', [dateFromKey]: '', [dateToKey]: '' });
    };

    const hasFilters = search !== '' || (status !== 'all' && status !== '') || dateFrom !== '' || dateTo !== '';

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Primary Row: Search & Status */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={placeholder}
                        className="pl-9 pr-9 w-full bg-background"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {statusOptions.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 justify-between sm:justify-center bg-background">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <span>Status</span>
                                </div>
                                {status !== 'all' && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                                        1
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={status === 'all'}
                                onCheckedChange={() => handleStatusChange('all')}
                            >
                                All Statuses
                            </DropdownMenuCheckboxItem>
                            {statusOptions.map((option) => (
                                <DropdownMenuCheckboxItem
                                    key={option.value}
                                    checked={status === option.value}
                                    onCheckedChange={() => handleStatusChange(option.value)}
                                >
                                    {option.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Secondary Row: Date Range & Reset */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Periode:</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => handleDateChange(e.target.value, dateTo)}
                            className="h-9 w-full sm:w-[140px] text-sm"
                            aria-label="Tanggal Pinjam"
                        />
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        <Input
                            type="date"
                            value={dateTo}
                            onChange={(e) => handleDateChange(dateFrom, e.target.value)}
                            className="h-9 w-full sm:w-[140px] text-sm"
                            aria-label="Tanggal Kembali"
                        />
                    </div>
                </div>

                {hasFilters && (
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="h-9 px-3 text-muted-foreground hover:text-foreground w-full sm:w-auto"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Reset Filters
                    </Button>
                )}
            </div>
        </div>
    );
}