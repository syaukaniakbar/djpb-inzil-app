<?php

namespace App\Filament\Resources\ConsumableItems\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class ConsumableItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Barang')
                    ->required()
                    ->maxLength(255),
                TextInput::make('sku')
                    ->label('SKU')
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
                    ->default(0),
                TextInput::make('min_stock')
                    ->label('Stok Minimum')
                    ->numeric()
                    ->minValue(0)
                    ->default(0),
                TextInput::make('unit')
                    ->label('Satuan')
                    ->maxLength(50)
                    ->default('pcs'),
                TextInput::make('location')
                    ->label('Lokasi Penyimpanan')
                    ->maxLength(255),
            ]);
    }
}
