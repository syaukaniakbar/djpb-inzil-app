<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VehicleInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name'),
                TextEntry::make('license_plate'),
                TextEntry::make('brand'),
                TextEntry::make('model'),
                TextEntry::make('color'),
                TextEntry::make('fuel_type'),
                TextEntry::make('registration_expiry')
                    ->date(),
                TextEntry::make('year'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
