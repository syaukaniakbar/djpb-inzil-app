<?php

namespace App\Filament\Resources\VehicleBorrowings\Pages;

use App\Filament\Resources\VehicleBorrowings\VehicleBorrowingResource;
use App\Models\Vehicle;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class CreateVehicleBorrowing extends CreateRecord
{
    protected static string $resource = VehicleBorrowingResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        // Check if the selected vehicle is available for the requested time range
        $vehicle = Vehicle::find($data['vehicle_id']);

        if (!$vehicle) {
            throw ValidationException::withMessages([
                'vehicle_id' => 'The selected vehicle does not exist.'
            ]);
        }

        // Check for overlapping bookings
        if (!$vehicle->isAvailableForRange($data['start_at'], $data['end_at'])) {
            throw ValidationException::withMessages([
                'vehicle_id' => 'This vehicle is already booked for the selected time range. Please select a different time or vehicle.'
            ]);
        }

        return static::getModel()::create($data);
    }
}
