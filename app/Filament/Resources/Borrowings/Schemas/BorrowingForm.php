<?php

namespace App\Filament\Resources\Borrowings\Schemas;

use App\Models\Inventory;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Model;

class BorrowingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([

                // ── Borrowing Info ─────────────────────────────────
                Select::make('user_id')
                    ->label('Pengguna')
                    ->relationship('user', 'name')
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
                    ->afterStateUpdated(function ($state, $set, $get) {
                        $endAt = $get('end_at');

                        if ($endAt && $state && $state >= $endAt) {
                            $set('end_at', null);
                        }

                        // reset inventory_id inside repeater
                        $details = $get('borrowingDetails') ?? [];

                        foreach ($details as $key => $item) {
                            $details[$key]['inventory_id'] = null;
                        }

                        $set('borrowingDetails', $details);
                    })
                    ->columnSpan(1),

                DateTimePicker::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->live()
                    ->placeholder('Pilih tanggal kembali')
                    ->minDate(fn($get) => $get('start_at'))
                    ->after('start_at')
                    ->afterStateUpdated(function ($set, $get) {

                        $details = $get('borrowingDetails') ?? [];

                        foreach ($details as $key => $item) {
                            $details[$key]['inventory_id'] = null;
                        }

                        $set('borrowingDetails', $details);
                    })
                    ->validationMessages([
                        'after' => 'Tanggal pengembalian harus setelah tanggal peminjaman.',
                    ])
                    ->columnSpan(1),

                // ── Borrowing Items ───────────────────────────────
                Repeater::make('borrowingDetails')
                    ->label('Daftar Barang')
                    ->relationship('borrowingDetails')
                    ->schema([

                        Select::make('inventory_id')
                            ->label('Barang')
                            ->placeholder('Pilih barang')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->live()
                            ->disableOptionsWhenSelectedInSiblingRepeaterItems()
                            ->disabled(fn($get) => !$get('../../start_at') || !$get('../../end_at'))
                            ->columnSpan(2)

                            ->options(function ($get, ?Model $record) {

                                $startAt = $get('../../start_at');
                                $endAt = $get('../../end_at');

                                $query = Inventory::query()
                                    ->select('id', 'name', 'serial_number');

                                if ($startAt && $endAt) {
                                    $excludeBorrowingId = $record?->borrowing_id ?? null;

                                    $query = Inventory::availableForRange(
                                        $startAt,
                                        $endAt,
                                        $excludeBorrowingId
                                    );
                                }

                                return $query
                                    ->get()
                                    ->mapWithKeys(fn($i) => [
                                        $i->id => $i->serial_number
                                            ? "{$i->name} (S/N: {$i->serial_number})"
                                            : $i->name
                                    ])
                                    ->toArray();
                            }),

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

                // ── Status ────────────────────────────────────────
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

