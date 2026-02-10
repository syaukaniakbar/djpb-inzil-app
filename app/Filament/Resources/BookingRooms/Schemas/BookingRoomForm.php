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
                    ->live()
                    ->disabled(fn() => auth()->user()->role !== 'admin'),

                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->required()
                    ->live()
                    ->disabled(fn() => auth()->user()->role !== 'admin'),

                Select::make('room_id')
                    ->label('Pilih Ruangan')
                    ->required()
                    ->options(function ($get) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');
                        $roomId = $get('room_id');

                        if (!$startAt || !$endAt) {
                            return Room::where('id', $roomId)
                                ->pluck('name', 'id')
                                ->toArray();
                        }

                        return Room::query()
                            ->where(function ($query) use ($startAt, $endAt, $roomId) {
                                $query
                                    ->whereDoesntHave('bookingRooms', function ($q) use ($startAt, $endAt) {
                                        $q->whereIn('status', ['pending', 'approved', 'ongoing'])
                                            ->where('start_at', '<', $endAt)
                                            ->where('end_at', '>', $startAt);
                                    })
                                    ->orWhere('id', $roomId);
                            })
                            ->pluck('name', 'id')
                            ->toArray();
                    })
                    ->searchable()
                    ->preload()
                    ->live(),

                Select::make('event_mode')
                    ->label('Jenis Acara')
                    ->options([
                        'offline' => 'Offline',
                        'online' => 'Online',
                        'hybrid' => 'Hybrid',
                    ])
                    ->required(),

                TextInput::make('event_name')
                    ->label('Nama Acara')
                    ->required(),

                Textarea::make('admin_note')
                    ->label('Catatan Admin')
                    ->placeholder('Opsional')
                    ->columnSpanFull(),

                Hidden::make('status')
                    ->default(fn(?string $operation) => $operation === 'create' ? 'pending' : null)
            ]);
    }
}
