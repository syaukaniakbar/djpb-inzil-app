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
                    ->options(function (Get $get) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');

                        // Only filter if both dates are selected
                        if ($startAt && $endAt) {
                            // Filter vehicles based on availability for the selected time range
                            $availableVehicles = Vehicle::whereDoesntHave('vehicleBorrowings', function ($query) use ($startAt, $endAt) {
                                $query->where('start_at', '<', $endAt)  // The new booking starts before the existing one ends
                                      ->where('end_at', '>', $startAt)  // The new booking ends after the existing one starts
                                      ->whereIn('status', ['pending', 'ongoing']);
                            })->get();
                        } else {
                            // If dates are not fully selected, show no vehicles
                            $availableVehicles = collect(); // Empty collection
                        }

                        return $availableVehicles->pluck('name', 'id')->toArray();
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
                        return 'Pilih kendaraan yang tersedia untuk periode yang dipilih';
                    })
                    ->live(), // Make it live to update when dates change

                DateTimePicker::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->required()
                    ->live() // Make it live to trigger vehicle availability check
                    ->disabled(fn () => auth()->user()->role !== 'admin'), // Only admin can change dates

                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->required()
                    ->live() // Make it live to trigger vehicle availability check
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
