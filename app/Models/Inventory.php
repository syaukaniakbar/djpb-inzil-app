<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inventory extends Model
{
    protected $fillable = [
        'name',
        'serial_number',
        'description',
        'category',
    ];

    protected $casts = [

    ];

    public function borrowingDetails(): HasMany
    {
        return $this->hasMany(BorrowingDetail::class);
    }

    /**
     * Check if inventory is being borrowed during a specific period.
     * Uses date overlap: start_at < end AND end_at > start.
     *
     * @param Carbon      $start             Start of the period to check
     * @param Carbon      $end               End of the period to check
     * @param int|null    $excludeBorrowingId Exclude this borrowing from the check (e.g. the current one)
     */
    public function isBeingBorrowedDuring(Carbon $start, Carbon $end, ?int $excludeBorrowingId = null): bool
    {
        return $this->borrowingDetails()
            ->whereHas('borrowing', function ($query) use ($start, $end, $excludeBorrowingId) {
                $query->whereIn('status', ['pending', 'approved', 'ongoing'])
                    ->where('start_at', '<', $end)
                    ->where('end_at', '>', $start);

                if ($excludeBorrowingId) {
                    $query->where('id', '!=', $excludeBorrowingId);
                }
            })
            ->exists();
    }

    /**
     * Backward-compatible check: is inventory currently being borrowed at this moment?
     */
    public function isBeingBorrowed(): bool
    {
        $now = Carbon::now();

        return $this->borrowingDetails()
            ->whereHas('borrowing', function ($query) use ($now) {
                $query->whereIn('status', ['pending', 'approved', 'ongoing'])
                    ->where('start_at', '<=', $now)
                    ->where('end_at', '>=', $now);
            })
            ->exists();
    }
}
