<?php

namespace App\Filament\Resources\BookingRooms\Pages;

use App\Filament\Resources\BookingRooms\BookingRoomResource;
use App\Models\Room;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class CreateBookingRoom extends CreateRecord
{
    protected static string $resource = BookingRoomResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        // Check if the selected room is available for the requested time range
        $room = Room::find($data['room_id']);

        if (!$room) {
            throw ValidationException::withMessages([
                'room_id' => 'The selected room does not exist.'
            ]);
        }

        // Check for overlapping bookings
        if (!$room->isAvailableForRange($data['start_at'], $data['end_at'])) {
            throw ValidationException::withMessages([
                'room_id' => 'This room is already booked for the selected time range. Please select a different time or room.'
            ]);
        }

        return static::getModel()::create($data);
    }
}
