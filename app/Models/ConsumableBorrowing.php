<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\ValidationException;

class ConsumableBorrowing extends Model
{
    use HasFactory;

    protected $table = 'consumable_borrowings';

    protected $fillable = [
        'user_id',
        'consumable_item_id',
        'quantity',
        'borrowed_at',
        'status',
        'notes',
    ];

    protected $casts = [
        'borrowed_at' => 'datetime',
        'quantity' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        // Reduce stock when creating new borrowing
        static::creating(function ($borrowing) {
            $consumableItem = ConsumableItem::find($borrowing->consumable_item_id);

            if (!$consumableItem) {
                throw ValidationException::withMessages([
                    'consumable_item_id' => 'Persediaan yang dipilih tidak ditemukan.'
                ]);
            }

            if ($borrowing->quantity > $consumableItem->quantity) {
                throw ValidationException::withMessages([
                    'quantity' => "Jumlah yang diminta melebihi stok yang tersedia. Tersedia: {$consumableItem->quantity}"
                ]);
            }

            // Set default status if not set
            if (!$borrowing->status) {
                $borrowing->status = 'pending';
            }

            // Reduce stock immediately (consumable = langsung berkurang)
            $consumableItem->decrement('quantity', $borrowing->quantity);
        });

        // Restore stock if borrowing is deleted while still pending
        static::deleting(function ($borrowing) {
            if ($borrowing->isPending()) {
                $consumableItem = $borrowing->consumableItem;
                if ($consumableItem) {
                    $consumableItem->increment('quantity', $borrowing->quantity);
                }
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function consumableItem(): BelongsTo
    {
        return $this->belongsTo(ConsumableItem::class);
    }

    /**
     * Scope for pending borrowings
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for finished borrowings
     */
    public function scopeFinished($query)
    {
        return $query->where('status', 'finished');
    }

    /**
     * Scope for canceled borrowings
     */
    public function scopeCanceled($query)
    {
        return $query->where('status', 'canceled');
    }

    /**
     * Scope for rejected borrowings
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Check if the borrowing is pending
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the borrowing is finished
     */
    public function isFinished(): bool
    {
        return $this->status === 'finished';
    }

    /**
     * Check if the borrowing is canceled
     */
    public function isCanceled(): bool
    {
        return $this->status === 'canceled';
    }

    /**
     * Check if the borrowing is rejected
     */
    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    /**
     * Mark as finished
     */
    public function markAsFinished(): bool
    {
        if (!$this->isPending()) {
            return false;
        }

        $this->status = 'finished';
        return $this->save();
    }

    /**
     * Mark as canceled
     */
    public function markAsCanceled(): bool
    {
        if (!$this->isPending()) {
            return false;
        }

        // Restore stock if canceled
        $consumableItem = $this->consumableItem;
        if ($consumableItem) {
            $consumableItem->increment('quantity', $this->quantity);
        }

        $this->status = 'canceled';
        return $this->save();
    }

    /**
     * Mark as rejected
     */
    public function markAsRejected(): bool
    {
        if (!$this->isPending()) {
            return false;
        }

        // Restore stock if rejected
        $consumableItem = $this->consumableItem;
        if ($consumableItem) {
            $consumableItem->increment('quantity', $this->quantity);
        }

        $this->status = 'rejected';
        return $this->save();
    }

    /**
     * Get status label
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Pending',
            'finished' => 'Finished',
            'rejected' => 'Rejected',
            'canceled' => 'Canceled',
            default => ucfirst($this->status),
        };
    }

    /**
     * Get status badge color
     */
    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'warning',
            'finished' => 'success',
            'rejected' => 'danger',
            'canceled' => 'danger',
            default => 'gray',
        };
    }
}
