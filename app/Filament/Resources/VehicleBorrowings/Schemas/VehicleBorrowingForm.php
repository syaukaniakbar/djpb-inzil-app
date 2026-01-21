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
use Filament\Schemas\Components\Utilities\Get;
use Filament\Forms\Components\Textarea;

class VehicleBorrowingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Pengguna')
                    ->relationship('user', 'name')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),
                DateTimePicker::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->required()
                    ->live()
                    ->disabled(fn () => auth()->user()->role !== 'admin'),
                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->required()
                    ->live()
                    ->disabled(fn () => auth()->user()->role !== 'admin'), 
                
                Select::make('vehicle_id')
                    ->label('Pilih Kendaraan')
                    ->required()
                    ->options(function (Get $get) {
                        $startAt = $get('start_at');
                        $endAt   = $get('end_at');

                        if (! $startAt || ! $endAt) {
                            return [];
                        }
                        return Vehicle::all()
                            ->filter(fn ($vehicle) =>
                                $vehicle->isAvailableForRange($startAt, $endAt)
                            )
                            ->pluck('name', 'id')
                            ->toArray();
                    }),

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
                
                Textarea::make('admin_note')
                    ->label('Admin Note')
                    ->columnSpanFull(),

                // Admin-specific fields
                Hidden::make('status')
                    ->default('pending'),


            ]);
    }
}
