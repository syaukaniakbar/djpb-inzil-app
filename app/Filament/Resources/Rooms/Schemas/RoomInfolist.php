<?php

namespace App\Filament\Resources\Rooms\Schemas;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Support\Enums\FontWeight;
use Filament\Schemas\Schema;

class RoomInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()->schema([
                    Section::make('Informasi Ruangan')
                        ->description('Detail kapasitas dan identitas ruangan')
                        ->icon('heroicon-o-building-office')
                        ->columns([
                            'default' => 1,
                            'sm' => 2,
                        ])
                        ->schema([
                            TextEntry::make('name')
                                ->label('Nama Ruangan')
                                ->weight(FontWeight::Bold),
                            TextEntry::make('capacity')
                                ->label('Kapasitas')
                                ->suffix(' Orang')
                                ->badge()
                                ->color('info'),
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
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->where('status', 'ongoing')
                                            ->first()?->user?->name ?? '-'),
                                    TextEntry::make('ongoing_event')
                                        ->label('Acara')
                                        ->placeholder('-')
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->where('status', 'ongoing')
                                            ->first()?->event_name ?? '-'),
                                    TextEntry::make('ongoing_borrowing_date')
                                        ->label('Waktu Mulai')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->where('status', 'ongoing')
                                            ->first()?->start_at ?? null),
                                    TextEntry::make('ongoing_return_date')
                                        ->label('Waktu Selesai')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->where('status', 'ongoing')
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
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->where('status', 'ongoing')
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
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->where('start_at', '>', now())
                                            ->orderBy('start_at')
                                            ->first()?->user?->name ?? '-'),
                                    TextEntry::make('upcoming_event')
                                        ->label('Acara')
                                        ->placeholder('-')
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->where('start_at', '>', now())
                                            ->orderBy('start_at')
                                            ->first()?->event_name ?? '-'),
                                    TextEntry::make('upcoming_borrowing_date')
                                        ->label('Waktu Mulai')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->where('start_at', '>', now())
                                            ->orderBy('start_at')
                                            ->first()?->start_at ?? null),
                                    TextEntry::make('upcoming_return_date')
                                        ->label('Waktu Selesai')
                                        ->placeholder('-')
                                        ->dateTime('d M Y H:i')
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->where('start_at', '>', now())
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
                                        ->getStateUsing(fn($record) => $record->bookingRooms()
                                            ->whereIn('status', ['pending', 'approved'])
                                            ->where('start_at', '>', now())
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
