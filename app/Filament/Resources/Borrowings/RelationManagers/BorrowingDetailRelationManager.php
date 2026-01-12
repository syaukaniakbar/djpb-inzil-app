<?php

namespace App\Filament\Resources\Borrowings\RelationManagers;

use App\Filament\Resources\BorrowingDetails\Schemas\BorrowingDetailForm;
use App\Filament\Resources\BorrowingDetails\Tables\BorrowingDetailsTable;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class BorrowingDetailRelationManager extends RelationManager
{
    protected static string $relationship = 'borrowingDetails';

    /**
     * Form (Filament 4 – NON static)
     */
    public function form(Schema $schema): Schema
    {
        return BorrowingDetailForm::configure($schema);
    }

    /**
     * Table (NON static)
     */
    public function table(Table $table): Table
    {
        return BorrowingDetailsTable::configure($table);
    }
}
