<?php

namespace App\Filament\Resources\BookingRooms\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use App\Models\User;
use App\Models\Room;

class BookingRoomForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Select::make('user_id')
                    ->label('Pengguna')
                    ->relationship('user', 'name')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih pengguna')
                    ->required()
                    ->columnSpan(1),

                Select::make('event_mode')
                    ->label('Jenis Acara')
                    ->options([
                        'offline' => 'Offline',
                        'online' => 'Online',
                        'hybrid' => 'Hybrid',
                    ])
                    ->placeholder('Pilih jenis acara')
                    ->required()
                    ->columnSpan(1),

                DateTimePicker::make('start_at')
                    ->label('Tanggal Mulai')
                    ->required()
                    ->live()
                    ->placeholder('Pilih tanggal mulai')
                    // Layer 2: Auto-reset end_at & ruangan jika start_at berubah menjadi >= end_at
                    ->afterStateUpdated(function ($state, $set, $get) {
                        $endAt = $get('end_at');
                        if ($endAt && $state && $state >= $endAt) {
                            $set('end_at', null);
                        }
                        $set('room_id', null);
                    })
                    ->columnSpan(1),

                DateTimePicker::make('end_at')
                    ->label('Tanggal Selesai')
                    ->required()
                    ->live()
                    ->placeholder('Pilih tanggal selesai')
                    // Layer 1: Batasi picker agar tidak bisa memilih sebelum start_at
                    ->minDate(fn($get) => $get('start_at'))
                    // Layer 3: Validasi server-side saat submit
                    ->after('start_at')
                    ->validationMessages([
                        'after' => 'Tanggal selesai harus setelah tanggal mulai.',
                    ])
                    ->afterStateUpdated(fn($set) => $set('room_id', null))
                    ->columnSpan(1),

                Select::make('room_id')
                    ->label('Pilih Ruangan')
                    ->required()
                    ->options(function ($get, $record) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');
                        // ID booking aktif (untuk mode edit, agar ruangan saat ini tetap tampil)
                        $currentBookingId = $record?->id;

                        $label = fn($r) => "{$r->name} (Kapasitas: {$r->capacity} orang)";

                        // Jika tanggal belum lengkap, tampilkan semua ruangan
                        if (!$startAt || !$endAt) {
                            return Room::all()
                                ->mapWithKeys(fn($r) => [$r->id => $label($r)])
                                ->toArray();
                        }

                        // Pakai scope dari model agar logika overlap konsisten
                        return Room::availableForRange($startAt, $endAt, $currentBookingId)
                            ->get()
                            ->mapWithKeys(fn($r) => [$r->id => $label($r)])
                            ->toArray();
                    })
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih ruangan')
                    ->live()
                    ->disabled(fn($get) => !$get('start_at') || !$get('end_at'))
                    ->helperText(
                        fn($get) => (!$get('start_at') || !$get('end_at'))
                        ? '⚠️ Pilih tanggal mulai dan selesai terlebih dahulu'
                        : 'Hanya ruangan yang tersedia pada rentang waktu dipilih'
                    )
                    ->columnSpanFull(),

                TextInput::make('event_name')
                    ->label('Nama Acara')
                    ->required()
                    ->placeholder('Masukkan nama acara')
                    ->columnSpanFull(),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'ongoing' => 'Ongoing',
                        'finished' => 'Finished',
                        'rejected' => 'Rejected',
                    ])
                    ->default(fn(?string $operation) => $operation === 'create' ? 'pending' : null)
                    ->placeholder('Pilih status')
                    ->required()
                    ->columnSpan(1),

                Textarea::make('admin_note')
                    ->label('Catatan Admin')
                    ->placeholder('Tambahkan catatan (opsional)')
                    ->rows(3)
                    ->columnSpan(1),
            ]);
    }
}
