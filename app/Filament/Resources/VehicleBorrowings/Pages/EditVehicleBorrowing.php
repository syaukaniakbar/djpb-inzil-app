<?php

namespace App\Filament\Resources\VehicleBorrowings\Pages;

use App\Filament\Resources\VehicleBorrowings\VehicleBorrowingResource;
use App\Models\Vehicle;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\VehicleBorrowings\Actions\ApproveAction;
use App\Filament\Resources\VehicleBorrowings\Actions\RejectAction;
use App\Filament\Resources\VehicleBorrowings\Actions\MarkAsReturnedAction;
use App\Filament\Resources\VehicleBorrowings\Actions\ReturnVehicleAction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class EditVehicleBorrowing extends EditRecord
{
    protected static string $resource = VehicleBorrowingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            ApproveAction::make(),
            RejectAction::make(),
            MarkAsReturnedAction::make(),
            ReturnVehicleAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function handleRecordUpdate($record, array $data): Model
    {
        // Check if the selected vehicle is available for the requested time range (excluding current record)
        $vehicle = Vehicle::find($data['vehicle_id']);

        if (!$vehicle) {
            throw ValidationException::withMessages([
                'vehicle_id' => 'The selected vehicle does not exist.'
            ]);
        }

        // Check for overlapping bookings (excluding the current record)
        $overlappingBorrowing = $vehicle->vehicleBorrowings()
            ->where('start_at', '<', $data['end_at'])  // The new booking starts before the existing one ends
            ->where('end_at', '>', $data['start_at'])  // The new booking ends after the existing one starts
            ->where('id', '!=', $record->id) // Exclude current record
            ->whereIn('status', ['pending', 'ongoing'])
            ->first();

        if ($overlappingBorrowing) {
            throw ValidationException::withMessages([
                'vehicle_id' => 'This vehicle is already booked for the selected time range. Please select a different time or vehicle.'
            ]);
        }

        $record->update($data);

        return $record;
    }
}
