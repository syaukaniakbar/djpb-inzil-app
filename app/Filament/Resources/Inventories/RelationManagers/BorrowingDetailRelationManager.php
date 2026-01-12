<?php

namespace App\Filament\Resources\Inventories\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Forms\Components;
use Filament\Tables;
use Filament\Tables\Table;
use App\Filament\Resources\BorrowingDetails\Tables\BorrowingDetailsTable;

class BorrowingDetailRelationManager extends RelationManager
{
    protected static string $relationship = 'borrowingDetails';

    protected static ?string $recordTitleAttribute = 'borrowing.id';

    /**
     * FORM — NON STATIC (Filament 4)
     */
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Components\Select::make('borrowing_id')
                    ->relationship('borrowing', 'id')
                    ->required()
                    ->searchable()
                    ->preload(),

                Components\TextInput::make('quantity')
                    ->numeric()
                    ->required()
                    ->default(1),

                Components\Textarea::make('notes')
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }

    /**
     * TABLE — Filament 4
     */
    public function table(Table $table): Table
    {
        return BorrowingDetailsTable::configure($table);
    }

}