<?php

namespace App\Filament\Resources\BorrowingDetails\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class BorrowingDetailInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('borrowing_id')
                    ->numeric(),
                TextEntry::make('inventory_id')
                    ->numeric(),
                TextEntry::make('quantity')
                    ->numeric(),
                TextEntry::make('notes')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
