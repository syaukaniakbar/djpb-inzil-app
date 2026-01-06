<?php

namespace App\Filament\Resources\BookingRooms\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class BookingRoomInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user_id')
                    ->numeric(),
                TextEntry::make('room_id')
                    ->numeric(),
                TextEntry::make('start_at')
                    ->dateTime(),
                TextEntry::make('end_at')
                    ->dateTime(),
                TextEntry::make('event_mode'),
                TextEntry::make('event_name'),
                TextEntry::make('status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'ongoing',
                        'primary' => 'used',
                        'success' => 'finished',
                        'danger' => 'canceled',
                    ]),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
