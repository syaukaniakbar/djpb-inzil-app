<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class VehicleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('license_plate')
                    ->required(),
                TextInput::make('brand')
                    ->required(),
                TextInput::make('model')
                    ->required(),
                TextInput::make('color')
                    ->required(),
                TextInput::make('fuel_type')
                    ->required(),
                DatePicker::make('registration_expiry')
                    ->required(),
                TextInput::make('year')
                    ->required(),
            ]);
    }
}
