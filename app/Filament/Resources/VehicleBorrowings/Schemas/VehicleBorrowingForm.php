<?php

namespace App\Filament\Resources\VehicleBorrowings\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Hidden;
use App\Models\User;
use App\Models\Vehicle;
use Filament\Forms\Components\Section;

class VehicleBorrowingForm
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

                Select::make('vehicle_id')
                    ->label('Pilih Kendaraan')
                    ->required()
                    ->options(
                        Vehicle::all()->pluck('name', 'id')->toArray()
                    )
                    ->disabled(fn () => auth()->user()->role !== 'admin'), // Only admin can change vehicle

                DateTimePicker::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->required()
                    ->disabled(fn () => auth()->user()->role !== 'admin'), // Only admin can change dates

                Select::make('purpose')
                    ->label('Jenis Perjalanan')
                    ->options([
                        'dalam_kota' => 'Dalam Kota',
                        'luar_kota' => 'Luar Kota',
                    ])
                    ->required(),

                TextInput::make('destination')
                    ->label('Tujuan Perjalanan')
                    ->required(),

                // Admin-specific fields
                Hidden::make('status')
                    ->default('pending'),

                
            ]);
    }
}
