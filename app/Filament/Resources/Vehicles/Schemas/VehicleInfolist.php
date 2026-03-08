<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\FontWeight;
use Filament\Schemas\Schema;

class VehicleInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()->schema([
                    Section::make('Informasi Kendaraan')
                        ->description('Detail spesifikasi dan identitas kendaraan')
                        ->icon('heroicon-o-truck')
                        ->columns([
                            'default' => 1,
                            'sm' => 2,
                            'md' => 3,
                        ])
                        ->schema([
                            TextEntry::make('name')
                                ->label('Nama Kendaraan')
                                ->weight(FontWeight::Bold),
                            TextEntry::make('license_plate')
                                ->label('Plat Nomor')
                                ->badge()
                                ->color('success'),
                            TextEntry::make('brand')
                                ->label('Merek'),
                            TextEntry::make('model')
                                ->label('Model'),
                            TextEntry::make('color')
                                ->label('Warna'),
                            TextEntry::make('year')
                                ->label('Tahun'),
                            TextEntry::make('fuel_type')
                                ->label('Bahan Bakar'),
                            TextEntry::make('registration_expiry')
                                ->label('Masa Berlaku STNK')
                                ->date('d M Y')
                                ->badge()
                                ->color(fn($state) => $state && \Carbon\Carbon::parse($state)->isPast() ? 'danger' : 'primary'),
                        ]),

                    Grid::make(2)
                        ->schema([
                            Section::make('Peminjaman Berlangsung')
                                ->description('Informasi peminjaman saat ini')
                                ->icon('heroicon-o-arrow-path')
                                ->columnSpan(1)
                                ->schema([
                                    TextEntry::make('ongoing_borrower')
                                        ->label('Peminjam')
                                        ->placeholder('Tidak ada')
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->where('status', 'ongoing')
                                            ->whereNull('returned_at')
                                            ->first()?->user?->name ?? '-'),
                                    TextEntry::make('ongoing_borrowing_date')
                                        ->label('Tanggal Mulai')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->where('status', 'ongoing')
                                            ->whereNull('returned_at')
                                            ->first()?->start_at ?? null),
                                    TextEntry::make('ongoing_return_date')
                                        ->label('Rencana Kembali')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->where('status', 'ongoing')
                                            ->whereNull('returned_at')
                                            ->first()?->end_at ?? null),
                                    TextEntry::make('ongoing_status')
                                        ->label('Status')
                                        ->placeholder('-')
                                        ->badge()
                                        ->formatStateUsing(fn($state) => match ($state) {
                                            'ongoing' => 'Berlangsung',
                                            default => $state
                                        })
                                        ->color(fn($state) => match ($state) {
                                            'ongoing' => 'primary',
                                            default => 'gray'
                                        })
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->where('status', 'ongoing')
                                            ->whereNull('returned_at')
                                            ->first()?->status ?? null),
                                ]),

                            Section::make('Peminjaman Berikutnya')
                                ->description('Informasi peminjaman berikutnya')
                                ->icon('heroicon-o-clock')
                                ->columnSpan(1)
                                ->schema([
                                    TextEntry::make('upcoming_borrower')
                                        ->label('Peminjam')
                                        ->placeholder('Tidak ada')
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->whereNull('returned_at')
                                            ->orderBy('start_at')
                                            ->first()?->user?->name ?? '-'),
                                    TextEntry::make('upcoming_borrowing_date')
                                        ->label('Tanggal Mulai')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->whereNull('returned_at')
                                            ->orderBy('start_at')
                                            ->first()?->start_at ?? null),
                                    TextEntry::make('upcoming_return_date')
                                        ->label('Rencana Kembali')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->whereNull('returned_at')
                                            ->orderBy('start_at')
                                            ->first()?->end_at ?? null),
                                    TextEntry::make('upcoming_status')
                                        ->label('Status')
                                        ->placeholder('-')
                                        ->badge()
                                        ->formatStateUsing(fn($state) => match ($state) {
                                            'pending' => 'Menunggu',
                                            'approved' => 'Disetujui',
                                            default => $state
                                        })
                                        ->color(fn($state) => match ($state) {
                                            'pending' => 'warning',
                                            'approved' => 'info',
                                            default => 'gray'
                                        })
                                        ->getStateUsing(fn($record) => $record->vehicleBorrowings()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->whereNull('returned_at')
                                            ->orderBy('start_at')
                                            ->first()?->status ?? null),
                                ]),
                        ]),
                ])->columnSpan(['lg' => 3]),

                Group::make()->schema([
                    Section::make('Metadata')
                        ->schema([
                            TextEntry::make('created_at')
                                ->label('Dibuat Pada')
                                ->dateTime('d M Y H:i')
                                ->placeholder('-'),
                            TextEntry::make('updated_at')
                                ->label('Diperbarui Pada')
                                ->dateTime('d M Y H:i')
                                ->placeholder('-'),
                        ])
                ])->columnSpan(['lg' => 1]),
            ])
            ->columns(['lg' => 4]);
    }
}
