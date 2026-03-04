<?php

namespace App\Filament\Resources\Borrowings\Schemas;

use App\Models\Inventory;
use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BorrowingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                // ── Informasi Peminjaman ───────────────────────────────────
                Select::make('user_id')
                    ->label('Pengguna')
                    ->relationship('user', 'name')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih pengguna')
                    ->required()
                    ->columnSpanFull(),

                DateTimePicker::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->required()
                    ->live()
                    ->placeholder('Pilih tanggal mulai')
                    // Auto-reset end_at jika start_at berubah >= end_at
                    ->afterStateUpdated(function ($state, $set, $get) {
                        $endAt = $get('end_at');
                        if ($endAt && $state && $state >= $endAt) {
                            $set('end_at', null);
                        }
                    })
                    ->columnSpan(1),

                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->live()
                    ->placeholder('Pilih tanggal kembali')
                    ->minDate(fn($get) => $get('start_at'))
                    ->after('start_at')
                    ->validationMessages([
                        'after' => 'Tanggal pengembalian harus setelah tanggal peminjaman.',
                    ])
                    ->columnSpan(1),

                // ── Daftar Barang ──────────────────────────────────────────
                Repeater::make('borrowingDetails')
                    ->label('Daftar Barang')
                    ->relationship('borrowingDetails')
                    ->schema([
                        Select::make('inventory_id')
                            ->label('Barang')
                            ->options(function ($get) {
                                // Ambil tanggal dari parent form
                                $startAt = $get('../../start_at');
                                $endAt = $get('../../end_at');

                                $label = fn($i) => $i->serial_number
                                    ? "{$i->name} (S/N: {$i->serial_number})"
                                    : $i->name;

                                // Jika tanggal belum lengkap, tampilkan semua inventaris
                                if (!$startAt || !$endAt) {
                                    return Inventory::all()
                                        ->mapWithKeys(fn($i) => [$i->id => $label($i)])
                                        ->toArray();
                                }

                                return Inventory::availableForRange($startAt, $endAt)
                                    ->get()
                                    ->mapWithKeys(fn($i) => [$i->id => $label($i)])
                                    ->toArray();
                            })
                            ->searchable()
                            ->preload()
                            ->placeholder('Pilih barang')
                            ->required()
                            ->disableOptionsWhenSelectedInSiblingRepeaterItems()
                            ->columnSpan(2),

                        Textarea::make('notes')
                            ->label('Catatan Barang')
                            ->placeholder('Catatan khusus untuk barang ini (opsional)')
                            ->rows(2)
                            ->columnSpan(2),
                    ])
                    ->columns(2)
                    ->addActionLabel('+ Tambah Barang')
                    ->reorderable(false)
                    ->minItems(1)
                    ->helperText('Pilih minimal satu barang yang akan dipinjam.')
                    ->columnSpanFull(),

                // ── Status & Catatan ───────────────────────────────────────
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'ongoing' => 'Ongoing',
                        'finished' => 'Finished',
                        'canceled' => 'Canceled',
                        'rejected' => 'Rejected',
                    ])
                    ->default(fn(?string $operation) => $operation === 'create' ? 'pending' : null)
                    ->placeholder('Pilih status')
                    ->required()
                    ->columnSpan(1),

                Textarea::make('notes')
                    ->label('Catatan Peminjam')
                    ->placeholder('Tambahkan catatan (opsional)')
                    ->rows(3)
                    ->columnSpan(1),

                Textarea::make('admin_note')
                    ->label('Catatan Admin')
                    ->placeholder('Tambahkan catatan admin (opsional)')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }
}
