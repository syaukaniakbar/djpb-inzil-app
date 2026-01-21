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
                TextEntry::make('user.name')
                ->label('Pengguna')
                    ->numeric(),
                    
                TextEntry::make('room.name')
                ->label('Ruangan')
                    ->numeric(),
                TextEntry::make('start_at')
                ->label('Tanggal Peminjaman')
                    ->dateTime(),
                TextEntry::make('end_at')
                ->label('Tanggal Pengembalian')
                    ->dateTime(),
                TextEntry::make('event_mode')
                ->badge()
                ->label('Jenis Acara'),
                TextEntry::make('event_name')
                ->label('Nama Acara'),
                TextEntry::make('status')
                ->label('Status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'ongoing',
                        'primary' => 'used',
                        'success' => 'finished',
                        'danger' => 'canceled',
                    ]),
                TextEntry::make('admin_note')
                    ->label('Admin Note'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
