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
                TextEntry::make('borrowing.user.name')
                    ->label('Pengguna'),
                TextEntry::make('borrowing.id')
                    ->label('ID Peminjaman'),
                TextEntry::make('inventory.name')
                    ->label('Aset'),
                TextEntry::make('inventory.serial_number')
                    ->label('Nomor Seri'),
                TextEntry::make('quantity')
                    ->numeric()
                    ->label('Jumlah'),
                TextEntry::make('notes')
                    ->placeholder('-')
                    ->columnSpanFull()
                    ->label('Catatan'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-')
                    ->label('Dibuat Pada'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-')
                    ->label('Diperbarui Pada'),
            ]);
    }
}
