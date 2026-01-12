<?php

namespace App\Filament\Resources\BorrowingDetails\Schemas;

use App\Models\Borrowing;
use App\Models\Inventory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BorrowingDetailForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('borrowing_id')
                    ->label('Borrowing')
                    ->relationship('borrowing', 'id')
                    ->options(Borrowing::all()->pluck('id', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('inventory_id')
                    ->label('Inventory')
                    ->relationship('inventory', 'name')
                    ->options(Inventory::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),
                TextInput::make('quantity')
                    ->required()
                    ->numeric()
                    ->default(1)
                    ->minValue(1),
                Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }
}
