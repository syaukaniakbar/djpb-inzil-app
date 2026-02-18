<?php

namespace App\Filament\Resources\Borrowings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Filament\Forms\Components\DatePicker;
use Carbon\Carbon;
use App\Filament\Resources\Borrowings\Actions\ApproveAction;
use App\Filament\Resources\Borrowings\Actions\RejectAction;
use App\Filament\Resources\Borrowings\Actions\MarkAsReturnedAction;
use App\Filament\Resources\Borrowings\Actions\ReturnAssetAction;
use App\Filament\Resources\Borrowings\Actions\WhatsAppNotificationAction;


class BorrowingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('id')
                    ->label('ID Peminjaman')
                    ->numeric()
                    ->sortable()
                    ->searchable(),
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
                Filter::make('start_at')
                    ->form([
                        DatePicker::make('start_date')
                            ->label('Tanggal Mulai')
                            ->placeholder('Tanggal mulai'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when(
                                $data['start_date'],
                                fn($query, $date) => $query->whereDate('start_at', '>=', $date)
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['start_date'] ?? null) {
                            $indicators[] = 'Tanggal mulai: ' . Carbon::parse($data['start_date'])->format('d/m/Y');
                        }
                        return $indicators;
                    }),

                Filter::make('end_at')
                    ->form([
                        DatePicker::make('end_date')
                            ->label('Tanggal Selesai')
                            ->placeholder('Tanggal selesai'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when(
                                $data['end_date'],
                                fn($query, $date) => $query->whereDate('end_at', '<=', $date)
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['end_date'] ?? null) {
                            $indicators[] = 'Tanggal selesai: ' . Carbon::parse($data['end_date'])->format('d/m/Y');
                        }
                        return $indicators;
                    }),
            ])
            ->recordActions([
                EditAction::make(),
                ViewAction::make(),
                // Custom admin actions
                ApproveAction::make(),
                RejectAction::make(),
                MarkAsReturnedAction::make(),
                ReturnAssetAction::make(),
                WhatsAppNotificationAction::make(),
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
