<?php

namespace App\Filament\Resources\Inventories\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class InventoryInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name')
                    ->label('Nama Aset'),
                TextEntry::make('serial_number')
                    ->label('No. Seri')
                    ->placeholder('-'),
                TextEntry::make('description')
                    ->label('Deskripsi')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('category')
                    ->label('Kategori')
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
