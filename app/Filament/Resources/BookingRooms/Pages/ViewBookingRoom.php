<?php

namespace App\Filament\Resources\BookingRooms\Pages;

use App\Filament\Resources\BookingRooms\BookingRoomResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\BookingRooms\Actions\ApproveAction;
use App\Filament\Resources\BookingRooms\Actions\RejectAction;

class ViewBookingRoom extends ViewRecord
{
    protected static string $resource = BookingRoomResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            ApproveAction::make(),
            RejectAction::make(),
        ];
    }
}
