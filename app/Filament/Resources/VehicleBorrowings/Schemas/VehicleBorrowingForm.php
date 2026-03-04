<?php

namespace App\Filament\Resources\VehicleBorrowings\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Hidden;
use App\Models\User;
use App\Models\Vehicle;
use Filament\Forms\Components\Textarea;

class VehicleBorrowingForm
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

                Select::make('purpose')
                    ->label('Jenis Perjalanan')
                    ->options([
                        'dalam_kota' => 'Dalam Kota',
                        'luar_kota' => 'Luar Kota',
                    ])
                    ->placeholder('Pilih jenis perjalanan')
                    ->required()
                    ->columnSpan(1),

                DateTimePicker::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->required()
                    ->live()
                    ->placeholder('Pilih tanggal mulai')
                    ->afterStateUpdated(function ($state, $set, $get) {
                        // Layer 2: Auto-reset end_at & vehicle jika start_at berubah menjadi >= end_at
                        $endAt = $get('end_at');
                        if ($endAt && $state && $state >= $endAt) {
                            $set('end_at', null);
                        }
                        $set('vehicle_id', null);
                    })
                    ->columnSpan(1),

                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->required()
                    ->live()
                    ->placeholder('Pilih tanggal kembali')
                    // Layer 1: Batasi picker agar tidak bisa memilih sebelum start_at
                    ->minDate(fn($get) => $get('start_at'))
                    // Layer 3: Validasi server-side saat submit
                    ->after('start_at')
                    ->validationMessages([
                        'after' => 'Tanggal pengembalian harus setelah tanggal peminjaman.',
                    ])
                    ->afterStateUpdated(fn($set) => $set('vehicle_id', null))
                    ->columnSpan(1),

                Select::make('vehicle_id')
                    ->label('Pilih Kendaraan')
                    ->required()
                    ->options(function ($get, $record) {
                        $startAt = $get('start_at');
                        $endAt = $get('end_at');
                        // ID borrowing aktif (untuk mode edit, agar kendaraan saat ini tetap tampil)
                        $currentBorrowingId = $record?->id;

                        $label = fn($v) => "{$v->name} ({$v->license_plate})";

                        // Jika tanggal belum lengkap, tampilkan semua kendaraan
                        if (!$startAt || !$endAt) {
                            return Vehicle::all()
                                ->mapWithKeys(fn($v) => [$v->id => $label($v)])
                                ->toArray();
                        }

                        // Pakai scope dari model agar logika overlap konsisten
                        return Vehicle::availableForRange($startAt, $endAt, $currentBorrowingId)
                            ->get()
                            ->mapWithKeys(fn($v) => [$v->id => $label($v)])
                            ->toArray();
                    })
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih kendaraan')
                    ->live()
                    ->disabled(fn($get) => !$get('start_at') || !$get('end_at'))
                    ->helperText(
                        fn($get) => (!$get('start_at') || !$get('end_at'))
                        ? '⚠️ Pilih tanggal peminjaman dan pengembalian terlebih dahulu'
                        : 'Hanya kendaraan yang tersedia pada rentang waktu dipilih'
                    )
                    ->columnSpanFull(),

                TextInput::make('destination')
                    ->label('Tujuan Perjalanan')
                    ->required()
                    ->placeholder('Masukkan tujuan perjalanan')
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
