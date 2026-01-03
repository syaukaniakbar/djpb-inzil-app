<?php

namespace App\Filament\Resources\VehicleBorrowings\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VehicleBorrowingInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user.name')
                    ->label('User')
                    ->url(fn ($record) => route('filament.admin.resources.users.edit', ['record' => $record->user->id]))
                    ->openUrlInNewTab(),

                TextEntry::make('vehicle.name')
                    ->label('Vehicle'),

                TextEntry::make('vehicle.license_plate')
                    ->label('License Plate'),

                TextEntry::make('start_at')
                    ->dateTime()
                    ->label('Start Date'),

                TextEntry::make('end_at')
                    ->dateTime()
                    ->label('End Date'),

                TextEntry::make('purpose')
                    ->formatStateUsing(fn ($state) => $state === 'dalam_kota' ? 'Dalam Kota' : 'Luar Kota')
                    ->badge(),

                TextEntry::make('destination'),

                TextEntry::make('status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'finished',
                        'danger' => 'canceled',
                        'info' => 'ongoing',
                    ]),

                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),

                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
