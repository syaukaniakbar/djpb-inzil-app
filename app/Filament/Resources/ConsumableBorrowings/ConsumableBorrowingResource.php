<?php

namespace App\Filament\Resources\ConsumableBorrowings;

use App\Filament\Resources\ConsumableBorrowings\Pages\CreateConsumableBorrowing;
use App\Filament\Resources\ConsumableBorrowings\Pages\EditConsumableBorrowing;
use App\Filament\Resources\ConsumableBorrowings\Pages\ListConsumableBorrowings;
use App\Filament\Resources\ConsumableBorrowings\Pages\ViewConsumableBorrowing;
use App\Filament\Resources\ConsumableBorrowings\Schemas\ConsumableBorrowingForm;
use App\Filament\Resources\ConsumableBorrowings\Tables\ConsumableBorrowingsTable;
use App\Models\ConsumableBorrowing;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class ConsumableBorrowingResource extends Resource
{
    /** ------------------------------------------------------------------
     *  Model
     *  ------------------------------------------------------------------ */
    protected static ?string $model = ConsumableBorrowing::class;

    /** ------------------------------------------------------------------
     *  Navigation (Filament 4)
     *  ------------------------------------------------------------------ */
    protected static BackedEnum|string|null $navigationIcon =
        Heroicon::OutlinedArchiveBox;

    protected static ?string $navigationLabel = 'Pengambilan Persediaan';
    protected static ?string $pluralLabel = 'Riwayat Pengambilan Persediaan';
    protected static ?string $modelLabel = 'Pengambilan Persediaan';
    protected static string|UnitEnum|null $navigationGroup = 'Peminjaman';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return ConsumableBorrowingForm::configure($schema)
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return ConsumableBorrowingsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListConsumableBorrowings::route('/'),
            'create' => CreateConsumableBorrowing::route('/create'),
            'view' => ViewConsumableBorrowing::route('/{record}'),
            'edit' => EditConsumableBorrowing::route('/{record}/edit'),
        ];
    }
}
