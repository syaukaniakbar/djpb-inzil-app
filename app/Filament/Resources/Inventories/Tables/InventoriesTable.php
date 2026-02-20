<?php

namespace App\Filament\Resources\Inventories\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
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
                SelectFilter::make('status')
                    ->label('Status Peminjaman')
                    ->options([
                        'available' => 'Tersedia',
                        'borrowed' => 'Sedang Dipinjam',
                    ])
                    ->query(function ($query, array $data) {
                        if ($data['value'] === 'available') {
                            return $query->whereDoesntHave('borrowingDetails', function ($q) {
                                $q->whereHas('borrowing', function ($borrowingQuery) {
                                    $borrowingQuery->whereIn('status', ['pending', 'approved', 'ongoing']);
                                });
                            });
                        }

                        if ($data['value'] === 'borrowed') {
                            return $query->whereHas('borrowingDetails', function ($q) {
                                $q->whereHas('borrowing', function ($borrowingQuery) {
                                    $borrowingQuery->whereIn('status', ['pending', 'approved', 'ongoing']);
                                });
                            });
                        }

                        return $query;
                    }),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
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
