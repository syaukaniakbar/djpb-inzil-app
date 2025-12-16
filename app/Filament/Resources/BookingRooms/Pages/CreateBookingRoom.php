<?php

namespace App\Filament\Resources\BookingRooms\Pages;

use App\Filament\Resources\BookingRooms\BookingRoomResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBookingRoom extends CreateRecord
{
    protected static string $resource = BookingRoomResource::class;
}
