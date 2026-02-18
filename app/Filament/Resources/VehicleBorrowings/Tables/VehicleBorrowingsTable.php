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
use Filament\Forms\Components\DatePicker;
use Carbon\Carbon;
use App\Filament\Resources\VehicleBorrowings\Actions\ApproveAction;
use App\Filament\Resources\VehicleBorrowings\Actions\RejectAction;
use App\Filament\Resources\VehicleBorrowings\Actions\MarkAsReturnedAction;
use App\Filament\Resources\VehicleBorrowings\Actions\ReturnVehicleAction;
use App\Filament\Resources\VehicleBorrowings\Actions\WhatsAppNotificationAction;

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

                TextColumn::make('purpose')
                    ->label('Jenis Perjalanan')
                    ->formatStateUsing(
                        fn($state) =>
                        $state === 'dalam_kota' ? 'Dalam Kota' : 'Luar Kota'
                    )
                    ->badge()
                    ->sortable(),

                TextColumn::make('destination')
                    ->label('Tujuan Perjalanan')
                    ->searchable()
                    ->limit(30),
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
                        'approved' => 'Approved',
                        'ongoing' => 'Ongoing',
                        'finished' => 'Finished',
                        'canceled' => 'Canceled',
                        'rejected' => 'Rejected',
                    ]),

                SelectFilter::make('purpose')
                    ->options([
                        'dalam_kota' => 'Dalam Kota',
                        'luar_kota' => 'Luar Kota',
                    ]),

                Filter::make('active_borrowings')
                    ->label('Active Borrowings')
                    ->toggle()
                    ->query(fn(Builder $query) => $query->whereNull('end_at')->whereIn('status', ['pending', 'ongoing'])),

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
                ViewAction::make(),
                EditAction::make(),
                // Custom admin actions
                ApproveAction::make(),
                RejectAction::make(),
                MarkAsReturnedAction::make(),
                ReturnVehicleAction::make(),
                WhatsAppNotificationAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Hapus')
                        ->modalHeading('Hapus Data Peminjaman')
                        ->modalDescription('Apakah Anda yakin ingin menghapus data peminjaman kendaraan ini?')
                        ->modalSubmitActionLabel('Ya, Hapus')
                        ->modalCancelActionLabel('Batal'),
                ]),
            ])
            ->emptyStateHeading('Tidak Ada Data Peminjaman Kendaraan')
            ->emptyStateDescription('Klik tombol "Ajukan Peminjaman Kendaraan" untuk membuat data baru.');
    }

}
