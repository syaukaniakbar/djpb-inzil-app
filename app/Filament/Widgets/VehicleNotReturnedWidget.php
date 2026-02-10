<?php

namespace App\Filament\Widgets;

use App\Models\VehicleBorrowing;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Forms\Components\DatePicker;


class VehicleNotReturnedWidget extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 2;

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->heading('Peminjam yang belum mengembalikan kendaraan')
            ->description('Daftar peminjam dengan kendaraan yang masih belum dikembalikan')
            ->query(
                VehicleBorrowing::query()->active()
            )
            ->columns([
                TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->searchable(),

                TextColumn::make('vehicle.name')
                    ->label('Kendaraan'),

                TextColumn::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->dateTime(),

                TextColumn::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->dateTime(),

                TextColumn::make('returned_at')
                    ->label('Tanggal Pengembalian Aktual')
                    ->dateTime(),

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
            ]);
    }
}
