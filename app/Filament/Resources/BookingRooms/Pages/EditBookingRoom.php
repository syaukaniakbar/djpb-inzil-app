<?php

namespace App\Filament\Resources\BookingRooms\Pages;

use App\Filament\Resources\BookingRooms\BookingRoomResource;
use App\Models\Room;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\BookingRooms\Actions\ApproveAction;
use App\Filament\Resources\BookingRooms\Actions\RejectAction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;

class EditBookingRoom extends EditRecord
{
    protected static string $resource = BookingRoomResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            ApproveAction::make(),
            RejectAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function handleRecordUpdate($record, array $data): Model
    {
        // Check if the selected room is available for the requested time range (excluding current record)
        $room = Room::find($data['room_id']);

        if (!$room) {
            throw ValidationException::withMessages([
                'room_id' => 'The selected room does not exist.'
            ]);
        }

        // Check for overlapping bookings (excluding the current record)
        $overlappingBooking = $room->bookingRooms()
            ->where('start_at', '<', $data['end_at'])  // The new booking starts before the existing one ends
            ->where('end_at', '>', $data['start_at'])  // The new booking ends after the existing one starts
            ->where('id', '!=', $record->id) // Exclude current record
            ->whereIn('status', ['pending', 'ongoing'])
            ->first();

        if ($overlappingBooking) {
            throw ValidationException::withMessages([
                'room_id' => 'This room is already booked for the selected time range. Please select a different time or room.'
            ]);
        }

        $record->update($data);

        return $record;
    }
}
