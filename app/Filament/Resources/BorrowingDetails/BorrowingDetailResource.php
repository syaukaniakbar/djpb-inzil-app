<?php

namespace App\Filament\Resources\BorrowingDetails;

use App\Filament\Resources\BorrowingDetails\Pages\CreateBorrowingDetail;
use App\Filament\Resources\BorrowingDetails\Pages\EditBorrowingDetail;
use App\Filament\Resources\BorrowingDetails\Pages\ListBorrowingDetails;
use App\Filament\Resources\BorrowingDetails\Pages\ViewBorrowingDetail;
use App\Filament\Resources\BorrowingDetails\Schemas\BorrowingDetailForm;
use App\Filament\Resources\BorrowingDetails\Schemas\BorrowingDetailInfolist;
use App\Filament\Resources\BorrowingDetails\Tables\BorrowingDetailsTable;
use App\Models\BorrowingDetail;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class BorrowingDetailResource extends Resource
{
    /** ------------------------------------------------------------------
     *  Model
     *  ------------------------------------------------------------------ */
    protected static ?string $model = BorrowingDetail::class;

    /** ------------------------------------------------------------------
     *  Navigation
     *  ------------------------------------------------------------------ */
    protected static BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $navigationLabel = 'Borrowing Details';
    protected static ?string $modelLabel = 'Borrowing Detail';
    protected static ?string $pluralModelLabel = 'Borrowing Details';

    protected static string | UnitEnum | null $navigationGroup = 'Peminjaman Asset';

    protected static ?int $navigationSort = 3;

    /** ------------------------------------------------------------------
     *  Form (Filament 4)
     *  ------------------------------------------------------------------ */
    public static function form(Schema $schema): Schema
    {
        return BorrowingDetailForm::configure($schema)
            ->columns(2);
    }

    /** ------------------------------------------------------------------
     *  Infolist (Filament 4)
     *  ------------------------------------------------------------------ */
    public static function infolist(Schema $schema): Schema
    {
        return BorrowingDetailInfolist::configure($schema);
    }

    /** ------------------------------------------------------------------
     *  Table
     *  ------------------------------------------------------------------ */
    public static function table(Table $table): Table
    {
        return BorrowingDetailsTable::configure($table);
    }

    /** ------------------------------------------------------------------
     *  Relations
     *  ------------------------------------------------------------------ */
    public static function getRelations(): array
    {
        return [];
    }

    /** ------------------------------------------------------------------
     *  Pages
     *  ------------------------------------------------------------------ */
    public static function getPages(): array
    {
        return [
            'index'  => ListBorrowingDetails::route('/'),
            'create' => CreateBorrowingDetail::route('/create'),
            'view'   => ViewBorrowingDetail::route('/{record}'),
            'edit'   => EditBorrowingDetail::route('/{record}/edit'),
        ];
    }
}
