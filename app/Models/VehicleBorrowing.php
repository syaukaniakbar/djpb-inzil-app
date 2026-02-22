<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Traits\Searchable;

class VehicleBorrowing extends Model
{
    use Searchable;

    protected $searchableColumns = [
        'id',
        'purpose',
        'destination',
        'vehicle.name',
        'vehicle.license_plate',
    ];

    protected $filterableColumns = [
        'status',
    ];

    protected $dateFilterableColumns = [
        'start_at',
    ];

    protected $table = 'vehicle_borrowings';

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'start_at',
        'end_at',
        'returned_at',
        'purpose',
        'destination',
        'status',
        'admin_note'
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'returned_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function scopeActive($query)
    {
        return $query->whereNull('returned_at')
            ->whereIn('status', ['approved', 'ongoing']);
    }
}
