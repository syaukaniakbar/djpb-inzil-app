<?php

namespace App\Filament\Resources\VehicleBorrowings\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VehicleBorrowingInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user.name')
                    ->label('Pengguna')
                    ->url(fn($record) => route('filament.admin.resources.users.edit', ['record' => $record->user->id]))
                    ->openUrlInNewTab(),

                TextEntry::make('vehicle.name')
                    ->label('Kendaraan'),

                TextEntry::make('vehicle.license_plate')
                    ->label('Plat Kendaraan'),

                TextEntry::make('start_at')
                    ->dateTime()
                    ->label('Tanggal Peminjaman'),

                TextEntry::make('end_at')
                    ->dateTime()
                    ->label('Tanggal Pengembalian'),

                TextEntry::make('returned_at')
                    ->dateTime()
                    ->label('Tanggal Pengembalian Aktual'),

                TextEntry::make('purpose')
                    ->label('Jenis Perjalanan')
                    ->formatStateUsing(fn($state) => $state === 'dalam_kota' ? 'Dalam Kota' : 'Luar Kota')
                    ->badge(),

                TextEntry::make('destination')
                    ->label('Tujuan Perjalanan'),

                TextEntry::make('admin_note')
                    ->label('Catatan Admin'),

                TextEntry::make('status')
                    ->badge()
                    ->colors([
                        'warning' => 'pending',
                        'success' => ['approved', 'finished'],
                        'info' => 'ongoing',
                        'danger' => 'rejected',
                        'secondary' => 'canceled',
                    ]),

                TextEntry::make('created_at')
                    ->dateTime()
                    ->label('Dibuat Pada')
                    ->placeholder('-'),

                TextEntry::make('updated_at')
                    ->dateTime()
                    ->label('Diperbarui Pada')
                    ->placeholder('-'),
            ]);
    }
}
