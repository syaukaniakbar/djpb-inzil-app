<?php

namespace App\Filament\Resources\Borrowings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BorrowingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->numeric()
                    ->sortable()
                    ->searchable(),
                TextColumn::make('borrowingDetails.inventory.name')
                    ->label('Aset')
                    ->numeric()
                    ->sortable()
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
                TextColumn::make('notes')
                    ->label('Catatan')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('admin_note')
                    ->label('Catatan Admin')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'success' => ['approved', 'finished'],
                        'info' => 'ongoing',
                        'danger' => 'rejected',
                        'secondary' => 'canceled',
                    ])
                    ->sortable(),
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
                EditAction::make(),
                ViewAction::make(),
                // Custom admin actions
                \App\Filament\Resources\Borrowings\Actions\ApproveAction::make(),
                \App\Filament\Resources\Borrowings\Actions\RejectAction::make(),
                \App\Filament\Resources\Borrowings\Actions\MarkAsReturnedAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Hapus')
                        ->modalHeading('Hapus Data Peminjaman')
                        ->modalDescription('Apakah Anda yakin ingin menghapus data peminjaman ini?')
                        ->modalSubmitActionLabel('Ya, Hapus')
                        ->modalCancelActionLabel('Batal'),
                ]),
            ])
            ->emptyStateHeading('Tidak Ada Data Peminjaman')
            ->emptyStateDescription('Klik tombol "Ajukan Peminjaman" untuk membuat data baru.');
    }
}
