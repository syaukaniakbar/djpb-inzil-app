<?php

namespace App\Filament\Resources\BookingRooms\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
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
                    ->label('Pengguna')
                    ->required()
                    ->options(
                        User::where('role', 'user')->pluck('name', 'id')->toArray()
                    )
                    ->disabled(fn () => auth()->user()->role !== 'admin'), // Only admin can change user

                Select::make('room_id')
                    ->label('Pilih Ruangan')
                    ->required()
                    ->options(function (Get $get) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');

                        // Only filter if both dates are selected
                        if ($startAt && $endAt) {
                            // Filter rooms based on availability for the selected time range
                            $availableRooms = Room::whereDoesntHave('bookingRooms', function ($query) use ($startAt, $endAt) {
                                $query->where('start_at', '<', $endAt)  // The new booking starts before the existing one ends
                                      ->where('end_at', '>', $startAt)  // The new booking ends after the existing one starts
                                      ->whereIn('status', ['pending', 'ongoing']);
                            })->get();
                        } else {
                            // If dates are not fully selected, show no rooms
                            $availableRooms = collect(); // Empty collection
                        }

                        return $availableRooms->pluck('name', 'id')->toArray();
                    })
                    ->disabled(function (Get $get) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');
                        // Disable if dates are not fully selected or if not admin
                        return !($startAt && $endAt) || auth()->user()->role !== 'admin';
                    })
                    ->helperText(function (Get $get) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');
                        if (!$startAt || !$endAt) {
                            return 'Silakan pilih tanggal peminjaman dan tanggal pengembalian terlebih dahulu';
                        }
                        return 'Pilih ruangan yang tersedia untuk periode yang dipilih';
                    })
                    ->live(), // Make it live to update when dates change

                DateTimePicker::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->required()
                    ->live() // Make it live to trigger room availability check
                    ->disabled(fn () => auth()->user()->role !== 'admin'), // Only admin can change dates

                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->required()
                    ->live() // Make it live to trigger room availability check
                    ->disabled(fn () => auth()->user()->role !== 'admin'), // Only admin can change dates

                Select::make('event_mode')
                    ->label('Jenis Acara')
                    ->options([
                        'meeting' => 'Meeting',
                        'presentation' => 'Presentasi',
                        'training' => 'Training',
                        'interview' => 'Interview',
                        'other' => 'Lainnya',
                    ])
                    ->required(),

                TextInput::make('event_name')
                    ->label('Nama Acara')
                    ->required(),

                Hidden::make('status')
                    ->default('pending'),
            ]);
    }
}
