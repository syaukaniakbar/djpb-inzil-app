<?php

namespace App\Filament\Resources\VehicleBorrowings\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Hidden;
use App\Models\User;

class VehicleBorrowingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('User')
                    ->required()
                    ->options(
                        User::where('role', 'user')->pluck('name', 'id')->toArray()
                    ),
                Select::make('vehicle_id')
                    ->label('Vehicle')
                    ->required()
                    ->options(
                        \App\Models\Vehicle::all()->pluck('name', 'id')->toArray()
                    ),
                DateTimePicker::make('start_at')
                    ->required(),
                DateTimePicker::make('end_at')
                    ->required(),
                Select::make('purpose')
                    ->options([
                        'dalam_kota' => 'Dalam Kota',
                        'luar_kota' => 'Luar Kota',
                    ])
                    ->required(),
                TextInput::make('destination')
                    ->required(),
                Hidden::make('status')->default('pending'),
            ]);
    }
}
