<?php

namespace App\Filament\Resources\Inventories;

use App\Filament\Resources\Inventories\Pages\CreateInventory;
use App\Filament\Resources\Inventories\Pages\EditInventory;
use App\Filament\Resources\Inventories\Pages\ListInventories;
use App\Filament\Resources\Inventories\Pages\ViewInventory;
use App\Filament\Resources\Inventories\RelationManagers\BorrowingDetailRelationManager;
use App\Filament\Resources\Inventories\Schemas\InventoryForm;
use App\Filament\Resources\Inventories\Schemas\InventoryInfolist;
use App\Filament\Resources\Inventories\Tables\InventoriesTable;
use App\Models\Inventory;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class InventoryResource extends Resource
{
    /** ------------------------------------------------------------------
     *  Model
     *  ------------------------------------------------------------------ */
    protected static ?string $model = Inventory::class;

    /** ------------------------------------------------------------------
     *  Navigation (Filament 4)
     *  ------------------------------------------------------------------ */
    protected static BackedEnum|string|null $navigationIcon =
        Heroicon::OutlinedCube;

    protected static ?string $navigationLabel = 'Inventories';
    protected static ?string $modelLabel = 'Inventory';
    protected static ?string $pluralModelLabel = 'Inventories';

    protected static string | UnitEnum | null $navigationGroup = 'Peminjaman Asset';

    protected static ?int $navigationSort = 1;

    /** ------------------------------------------------------------------
     *  Form (Filament 4 – Schema based)
     *  ------------------------------------------------------------------ */
    public static function form(Schema $schema): Schema
    {
        return InventoryForm::configure($schema)
            ->columns(2);
    }

    /** ------------------------------------------------------------------
     *  Infolist (Filament 4)
     *  ------------------------------------------------------------------ */
    public static function infolist(Schema $schema): Schema
    {
        return InventoryInfolist::configure($schema);
    }

    /** ------------------------------------------------------------------
     *  Table
     *  ------------------------------------------------------------------ */
    public static function table(Table $table): Table
    {
        return InventoriesTable::configure($table);
    }

    /** ------------------------------------------------------------------
     *  Relations
     *  ------------------------------------------------------------------ */
    public static function getRelations(): array
    {
        return [
            BorrowingDetailRelationManager::class,
        ];
    }

    /** ------------------------------------------------------------------
     *  Pages
     *  ------------------------------------------------------------------ */
    public static function getPages(): array
    {
        return [
            'index'  => ListInventories::route('/'),
            'create' => CreateInventory::route('/create'),
            'view'   => ViewInventory::route('/{record}'),
            'edit'   => EditInventory::route('/{record}/edit'),
        ];
    }
}
