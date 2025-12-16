<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'name',
        'license_plate',
        'brand',
        'model',
        'color',
        'fuel_type',
        'registration_expiry',
        'year',
    ];

    public function activeBorrowing()
    {
        return $this->hasOne(VehicleBorrowing::class)
            ->whereNull('returned_at');
    }   
}
