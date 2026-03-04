<?php

namespace App\Filament\Resources\Departments\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DepartmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextInput::make('name')
                    ->label('Nama Departemen')
                    ->required()
                    ->placeholder('Masukkan nama departemen')
                    ->columnSpan(1),

                TextInput::make('code')
                    ->label('Kode Departemen')
                    ->required()
                    ->placeholder('Masukkan kode departemen')
                    ->columnSpan(1),
            ]);
    }
}
