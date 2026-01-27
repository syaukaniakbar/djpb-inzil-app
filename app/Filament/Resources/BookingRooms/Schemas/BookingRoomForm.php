<?php

namespace App\Filament\Resources\BookingRooms\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use App\Models\User;
use App\Models\Room;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Forms\Components\Hidden;

class BookingRoomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('User')
                    ->relationship('user', 'name')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),

                DateTimePicker::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->required()
                    ->live() // Make it live to trigger room availability check
                    ->disabled(fn() => auth()->user()->role !== 'admin'), // Only admin can change dates

                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->required()
                    ->live() // Make it live to trigger room availability check
                    ->disabled(fn() => auth()->user()->role !== 'admin'), // Only admin can change dates

                Select::make('room_id')
                    ->label('Pilih Ruangan')
                    ->options(function (Get $get) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');

                        if (!$startAt || !$endAt) {
                            return [];
                        }

                        return Room::all()
                            ->filter(
                                fn($room) =>
                                $room->isAvailableForRange($startAt, $endAt)
                            )
                            ->pluck('name', 'id')
                            ->toArray();
                    }),

                Select::make('event_mode')
                    ->label('Jenis Acara')
                    ->options([
                        'Offline' => 'Offline',
                        'Online' => 'Online',
                        'Hybrid' => 'Hybrid',
                    ])
                    ->required(),

                TextInput::make('event_name')
                    ->label('Nama Acara')
                    ->required(),

                Textarea::make('admin_note')
                    ->label('Catatan Admin')
                    ->columnSpanFull(),

                Hidden::make('status')
                    ->default('pending'),
            ]);
    }
}
