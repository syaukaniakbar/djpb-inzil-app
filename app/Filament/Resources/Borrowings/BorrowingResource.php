<?php

namespace App\Filament\Resources\Borrowings;

use App\Filament\Resources\Borrowings\Pages\CreateBorrowing;
use App\Filament\Resources\Borrowings\Pages\EditBorrowing;
use App\Filament\Resources\Borrowings\Pages\ListBorrowings;
use App\Filament\Resources\Borrowings\Pages\ViewBorrowing;
use App\Filament\Resources\Borrowings\RelationManagers\BorrowingDetailRelationManager;
use App\Filament\Resources\Borrowings\Schemas\BorrowingForm;
use App\Filament\Resources\Borrowings\Tables\BorrowingsTable;
use App\Models\Borrowing;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class BorrowingResource extends Resource
{
    /** ------------------------------------------------------------------
     *  Model
     *  ------------------------------------------------------------------ */
    protected static ?string $model = Borrowing::class;

    /** ------------------------------------------------------------------
     *  Navigation (Filament 4)
     *  ------------------------------------------------------------------ */
    protected static BackedEnum|string|null $navigationIcon =
        Heroicon::OutlinedClipboardDocumentList;

    protected static ?string $navigationLabel = 'Peminjaman Aset';
    protected static ?string $pluralLabel = 'Riwayat Peminjaman Aset';
    protected static ?string $modelLabel = 'Peminjaman Aset';
    protected static string|UnitEnum|null $navigationGroup = 'Peminjaman';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return BorrowingForm::configure($schema)
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return BorrowingsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            BorrowingDetailRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBorrowings::route('/'),
            'create' => CreateBorrowing::route('/create'),
            'view' => ViewBorrowing::route('/{record}'),
            'edit' => EditBorrowing::route('/{record}/edit'),
        ];
    }
}
