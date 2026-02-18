<?php

namespace App\Filament\Resources\Inventories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class InventoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Aset')
                    ->required()
                    ->maxLength(255),
                TextInput::make('serial_number')
                    ->label('No. Seri')
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Textarea::make('description')
                    ->label('Deskripsi')
                    ->columnSpanFull(),
                TextInput::make('category')
                    ->label('Kategori')
                    ->maxLength(255),
                TextInput::make('quantity')
                    ->label('Jumlah Stok')
                    ->numeric()
                    ->minValue(0)
                    ->required()
                    ->default(1),
            ]);
    }
}
