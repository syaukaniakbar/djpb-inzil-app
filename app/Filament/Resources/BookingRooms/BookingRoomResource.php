<?php

namespace App\Filament\Resources\BookingRooms;

use App\Filament\Resources\BookingRooms\Pages\CreateBookingRoom;
use App\Filament\Resources\BookingRooms\Pages\EditBookingRoom;
use App\Filament\Resources\BookingRooms\Pages\ListBookingRooms;
use App\Filament\Resources\BookingRooms\Pages\ViewBookingRoom;
use App\Filament\Resources\BookingRooms\Schemas\BookingRoomForm;
use App\Filament\Resources\BookingRooms\Schemas\BookingRoomInfolist;
use App\Filament\Resources\BookingRooms\Tables\BookingRoomsTable;
use App\Models\BookingRoom;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BookingRoomResource extends Resource

{

    protected static ?string $model = BookingRoom::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'BookingRoom';

    protected static ?string $navigationLabel = 'Peminjaman Ruangan';

    public static function form(Schema $schema): Schema
    {
        return BookingRoomForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return BookingRoomInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BookingRoomsTable::configure($table);
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
            'index' => ListBookingRooms::route('/'),
            'create' => CreateBookingRoom::route('/create'),
            'view' => ViewBookingRoom::route('/{record}'),
            'edit' => EditBookingRoom::route('/{record}/edit'),
        ];
    }
}
