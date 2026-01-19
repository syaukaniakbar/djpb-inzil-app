<?php

namespace App\Filament\Resources\VehicleBorrowings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;

class VehicleBorrowingsTable
{
    public static function configure(Table $table): Table
{
    return $table
        ->defaultSort('created_at', 'desc')
        ->columns([
            TextColumn::make('user.department.code')
                ->label('Departemen')
                ->sortable()
                ->searchable(),

            TextColumn::make('user.name')
                ->label('Pengguna')
                ->searchable()
                ->sortable(),

            TextColumn::make('vehicle.name')
                ->label('Kendaraan')
                ->sortable(),

            TextColumn::make('vehicle.license_plate')
                ->label('Plat Kendaraan')
                ->sortable(),

            TextColumn::make('start_at')
                ->label('Jadwal Peminjaman')
                ->dateTime()
                ->sortable(),

            TextColumn::make('end_at')
                ->label('Jadwal Pengembalian')
                ->dateTime()
                ->sortable(),

            TextColumn::make('returned_at')
                ->label('Waktu Pengembalian Aktual')
                ->dateTime()
                ->sortable(),

            TextColumn::make('purpose')
                ->label('Jenis Perjalanan')
                ->formatStateUsing(fn ($state) =>
                    $state === 'dalam_kota' ? 'Dalam Kota' : 'Luar Kota'
                )
                ->badge()
                ->sortable(),

            TextColumn::make('destination')
                ->label('Tujuan Perjalanan')
                ->searchable()
                ->limit(30),
            TextColumn::make('status')
                ->badge()
                ->colors([
                    'warning' => 'pending',
                    'success' => 'approved',
                    'info' => 'ongoing',
                    'danger' => 'rejected',
                    'success' => 'finished',
                    'secondary' => 'canceled',
                ])
                ->sortable(),
            TextColumn::make('created_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),

            TextColumn::make('updated_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
        ])
        ->filters([
            SelectFilter::make('status')
                ->options([
                    'pending' => 'Pending',
                    'ongoing' => 'Ongoing',
                    'finished' => 'Finished',
                    'canceled' => 'Canceled',
                ]),

            SelectFilter::make('purpose')
                ->options([
                    'dalam_kota' => 'Dalam Kota',
                    'luar_kota' => 'Luar Kota',
                ]),

            Filter::make('end_at')
                ->toggle()
                ->query(fn (Builder $query) => $query->whereNotNull('end_at')),

            Filter::make('active_borrowings')
                ->label('Active Borrowings')
                ->toggle()
                ->query(fn (Builder $query) => $query->whereNull('end_at')->whereIn('status', ['pending', 'ongoing'])),
        ])
        ->recordActions([
            ViewAction::make(),
            EditAction::make(),
            // Custom admin actions
            \App\Filament\Resources\VehicleBorrowings\Actions\ApproveAction::make(),
            \App\Filament\Resources\VehicleBorrowings\Actions\RejectAction::make(),
            \App\Filament\Resources\VehicleBorrowings\Actions\MarkAsReturnedAction::make(),
        ])
        ->bulkActions([
            BulkActionGroup::make([
                DeleteBulkAction::make(),
            ]),
        ])
        ->emptyStateHeading('Tidak Ada Data Peminjaman Kendaraan')
        ->emptyStateDescription('Klik tombol "Ajukan Peminjaman Kendaraan" untuk membuat data baru.');
}

}
