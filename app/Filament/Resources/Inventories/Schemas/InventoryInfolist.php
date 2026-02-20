<?php

namespace App\Filament\Resources\Inventories\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class InventoryInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name')
                    ->label('Nama Aset'),
                TextEntry::make('serial_number')
                    ->label('No. Seri')
                    ->placeholder('-'),
                TextEntry::make('description')
                    ->label('Deskripsi')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('category')
                    ->label('Kategori')
                    ->placeholder('-'),
                TextEntry::make('current_borrower')
                    ->label('Peminjam')
                    ->placeholder('-')
                    ->getStateUsing(fn($record) => $record->borrowingDetails()
                        ->whereHas('borrowing', function ($q) {
                            $q->whereIn('status', ['pending', 'approved', 'ongoing']);
                        })
                        ->first()?->borrowing?->user?->name ?? '-'),
                TextEntry::make('borrowing_date')
                    ->label('Tanggal Peminjaman')
                    ->placeholder('-')
                    ->dateTime()
                    ->getStateUsing(fn($record) => $record->borrowingDetails()
                        ->whereHas('borrowing', function ($q) {
                            $q->whereIn('status', ['pending', 'approved', 'ongoing']);
                        })
                        ->first()?->borrowing?->start_at ?? null),
                TextEntry::make('return_date')
                    ->label('Tanggal Pengembalian (Rencana)')
                    ->placeholder('-')
                    ->dateTime()
                    ->getStateUsing(fn($record) => $record->borrowingDetails()
                        ->whereHas('borrowing', function ($q) {
                            $q->whereIn('status', ['pending', 'approved', 'ongoing']);
                        })
                        ->first()?->borrowing?->end_at ?? null),
                TextEntry::make('borrowing_status')
                    ->label('Status Peminjaman')
                    ->placeholder('-')
                    ->badge()
                    ->formatStateUsing(fn($state) => match ($state) {
                        'pending' => 'Menunggu',
                        'approved' => 'Disetujui',
                        'ongoing' => 'Berlangsung',
                        default => $state
                    })
                    ->color(fn($state) => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'info',
                        'ongoing' => 'primary',
                        default => 'gray'
                    })
                    ->getStateUsing(fn($record) => $record->borrowingDetails()
                        ->whereHas('borrowing', function ($q) {
                            $q->whereIn('status', ['pending', 'approved', 'ongoing']);
                        })
                        ->first()?->borrowing?->status ?? null),
                TextEntry::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->placeholder('-'),
            ])
            ->columns(2);
    }
}
