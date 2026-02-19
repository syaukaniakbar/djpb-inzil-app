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

    protected static ?string $navigationLabel = 'Inventaris';
    protected static ?string $pluralLabel = 'Riwayat Inventaris';
    protected static ?string $modelLabel = 'Inventaris';
    protected static string|UnitEnum|null $navigationGroup = 'Kelola Aset';


    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return InventoryForm::configure($schema)
            ->columns(2);
    }

    public static function infolist(Schema $schema): Schema
    {
        return InventoryInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return InventoriesTable::configure($table);
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
            'index' => ListInventories::route('/'),
            'create' => CreateInventory::route('/create'),
            'view' => ViewInventory::route('/{record}'),
            'edit' => EditInventory::route('/{record}/edit'),
        ];
    }
}
