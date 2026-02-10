<?php

namespace App\Filament\Widgets;

use App\Models\Borrowing;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;

class InventoryNotReturnedWidget extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 2;

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->heading('Peminjam yang belum mengembalikan inventaris')
            ->description('Daftar peminjam dengan inventaris yang masih belum dikembalikan')
            ->query(
                Borrowing::query()->active()
            )
            ->columns([
                TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->searchable(),
                TextColumn::make('borrowingDetails.inventory.name')
                    ->label('Inventaris')
                    ->searchable(),
                TextColumn::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('returned_at')
                    ->label('Tanggal Pengembalian Aktual')
                    ->dateTime()
                    ->sortable(),
            ]);
    }
}
