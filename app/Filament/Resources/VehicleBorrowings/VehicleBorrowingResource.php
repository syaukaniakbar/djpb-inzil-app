<?php

namespace App\Filament\Resources\VehicleBorrowings;

use App\Filament\Resources\VehicleBorrowings\Pages\CreateVehicleBorrowing;
use App\Filament\Resources\VehicleBorrowings\Pages\EditVehicleBorrowing;
use App\Filament\Resources\VehicleBorrowings\Pages\ListVehicleBorrowings;
use App\Filament\Resources\VehicleBorrowings\Pages\ViewVehicleBorrowing;
use App\Filament\Resources\VehicleBorrowings\Schemas\VehicleBorrowingForm;
use App\Filament\Resources\VehicleBorrowings\Schemas\VehicleBorrowingInfolist;
use App\Filament\Resources\VehicleBorrowings\Tables\VehicleBorrowingsTable;
use App\Models\VehicleBorrowing;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VehicleBorrowingResource extends Resource
{
    protected static ?string $model = VehicleBorrowing::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCalendar;

    protected static ?string $recordTitleAttribute = 'VehicleBorrowing';

    protected static ?string $navigationLabel = 'Peminjaman Kendaraan';
    protected static ?string $pluralLabel = 'Riwayat Peminjaman Kendaraan';
    protected static ?string $modelLabel = 'Peminjaman Kendaraan';

    protected static ?int $navigationSort = 7;

    public static function form(Schema $schema): Schema
    {
        return VehicleBorrowingForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return VehicleBorrowingInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VehicleBorrowingsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVehicleBorrowings::route('/'),
            'create' => CreateVehicleBorrowing::route('/create'),
            'view' => ViewVehicleBorrowing::route('/{record}'),
            'edit' => EditVehicleBorrowing::route('/{record}/edit'),
        ];
    }
}
