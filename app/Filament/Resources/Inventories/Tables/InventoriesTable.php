<?php

namespace App\Filament\Resources\Inventories\Tables;

use App\Filament\Resources\Inventories\Actions\EditStockAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class InventoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama Aset')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('serial_number')
                    ->label('No. Seri')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category')
                    ->label('Kategori')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('quantity')
                    ->label('Jumlah Stok')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('available_quantity')
                    ->label('Stok Tersedia')
                    ->numeric()
                    ->getStateUsing(fn($record) => $record->getAvailableQuantityAttribute())
                    ->sortable(),
                TextColumn::make('description')
                    ->label('Deskripsi')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                EditStockAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Hapus')
                        ->modalHeading('Hapus Data Inventaris')
                        ->modalDescription('Apakah Anda yakin ingin menghapus data inventaris ini?')
                        ->modalSubmitActionLabel('Ya, Hapus')
                        ->modalCancelActionLabel('Batal'),
                ]),
            ])
            ->emptyStateHeading('Tidak Ada Data Inventaris')
            ->emptyStateDescription('Klik tombol "Tambah Inventaris" untuk membuat data baru.');
    }
}
