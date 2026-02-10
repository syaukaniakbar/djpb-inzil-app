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

    protected static ?string $model = BorrowingDetail::class;

    protected static BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $navigationLabel = 'Detail Peminjaman Asset';
    protected static ?string $pluralLabel = 'Detail Riwayat Peminjaman Asset';
    protected static ?string $modelLabel = 'Detail Peminjaman Asset';
    protected static string|UnitEnum|null $navigationGroup = 'Peminjaman';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return BorrowingDetailForm::configure($schema)
            ->columns(2);
    }

    public static function infolist(Schema $schema): Schema
    {
        return BorrowingDetailInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BorrowingDetailsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBorrowingDetails::route('/'),
            'create' => CreateBorrowingDetail::route('/create'),
            'view' => ViewBorrowingDetail::route('/{record}'),
            'edit' => EditBorrowingDetail::route('/{record}/edit'),
        ];
    }
}
