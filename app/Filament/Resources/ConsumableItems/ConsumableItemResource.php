<?php

namespace App\Filament\Resources\ConsumableItems;

use App\Filament\Resources\ConsumableItems\Pages\CreateConsumableItem;
use App\Filament\Resources\ConsumableItems\Pages\EditConsumableItem;
use App\Filament\Resources\ConsumableItems\Pages\ListConsumableItems;
use App\Filament\Resources\ConsumableItems\Pages\ViewConsumableItem;
use App\Filament\Resources\ConsumableItems\Schemas\ConsumableItemForm;
use App\Filament\Resources\ConsumableItems\Tables\ConsumableItemsTable;
use App\Models\ConsumableItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class ConsumableItemResource extends Resource
{
    /** ------------------------------------------------------------------
     *  Model
     *  ------------------------------------------------------------------ */
    protected static ?string $model = ConsumableItem::class;

    /** ------------------------------------------------------------------
     *  Navigation (Filament 4)
     *  ------------------------------------------------------------------ */
    protected static BackedEnum|string|null $navigationIcon =
        Heroicon::OutlinedCubeTransparent;

    protected static ?string $navigationLabel = 'Persediaan';
    protected static ?string $pluralLabel = 'Daftar Persediaan';
    protected static ?string $modelLabel = 'Persediaan';
    protected static string|UnitEnum|null $navigationGroup = 'Kelola Aset';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return ConsumableItemForm::configure($schema)
            ->columns(2);
    }

    public static function table(Table $table): Table
    {
        return ConsumableItemsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListConsumableItems::route('/'),
            'create' => CreateConsumableItem::route('/create'),
            'view' => ViewConsumableItem::route('/{record}'),
            'edit' => EditConsumableItem::route('/{record}/edit'),
        ];
    }
}
