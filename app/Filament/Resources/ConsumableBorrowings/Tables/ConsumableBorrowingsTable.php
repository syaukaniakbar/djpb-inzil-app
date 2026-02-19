<?php

namespace App\Filament\Resources\ConsumableBorrowings\Tables;

use App\Filament\Resources\ConsumableBorrowings\Actions\ApproveAction;
use App\Filament\Resources\ConsumableBorrowings\Actions\RejectAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Forms\Components\DatePicker;
use Carbon\Carbon;

class ConsumableBorrowingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->numeric()
                    ->sortable()
                    ->searchable(),
                TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('consumableItem.name')
                    ->label('Persediaan')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('quantity')
                    ->label('Jumlah')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('borrowed_at')
                    ->label('Tanggal Pengambilan')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn($state): string => match ($state) {
                        'pending' => 'Pending',
                        'finished' => 'Finished',
                        'rejected' => 'Rejected',
                        'canceled' => 'Canceled',
                        default => $state,
                    })
                    ->color(fn($state): string => match ($state) {
                        'pending' => 'warning',
                        'finished' => 'success',
                        'rejected' => 'danger',
                        'canceled' => 'danger',
                        default => 'gray',
                    })
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
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'finished' => 'Finished',
                        'rejected' => 'Rejected',
                        'canceled' => 'Canceled',
                    ])
                    ->multiple()
                    ->preload(),

                Filter::make('borrowed_at')
                    ->form([
                        DatePicker::make('from_date')
                            ->label('Dari Tanggal')
                            ->placeholder('Tanggal mulai'),
                        DatePicker::make('until_date')
                            ->label('Sampai Tanggal')
                            ->placeholder('Tanggal selesai'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when(
                                $data['from_date'] ?? null,
                                fn($query, $date) => $query->whereDate('borrowed_at', '>=', $date)
                            )
                            ->when(
                                $data['until_date'] ?? null,
                                fn($query, $date) => $query->whereDate('borrowed_at', '<=', $date)
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];

                        if ($data['from_date'] ?? null) {
                            $indicators[] = 'Dari: ' . Carbon::parse($data['from_date'])->format('d/m/Y');
                        }

                        if ($data['until_date'] ?? null) {
                            $indicators[] = 'Sampai: ' . Carbon::parse($data['until_date'])->format('d/m/Y');
                        }

                        return $indicators;
                    }),
            ])

            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                ApproveAction::make(),
                RejectAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Hapus')
                        ->modalHeading('Hapus Data Pengambilan Persediaan')
                        ->modalDescription('Apakah Anda yakin ingin menghapus data pengambilan ini?')
                        ->modalSubmitActionLabel('Ya, Hapus')
                        ->modalCancelActionLabel('Batal'),
                ]),
            ])
            ->emptyStateHeading('Tidak Ada Data Pengambilan Persediaan')
            ->emptyStateDescription('Klik tombol "Tambah Pengambilan" untuk membuat data baru.');
    }
}
