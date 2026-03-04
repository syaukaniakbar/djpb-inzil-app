<?php

namespace App\Filament\Resources\Positions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PositionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextInput::make('name')
                    ->label('Nama Jabatan')
                    ->required()
                    ->placeholder('Masukkan nama jabatan')
                    ->columnSpan(1),

                TextInput::make('code')
                    ->label('Kode Jabatan')
                    ->required()
                    ->placeholder('Masukkan kode jabatan')
                    ->columnSpan(1),
            ]);
    }
}
