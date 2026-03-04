<?php

namespace App\Filament\Resources\ConsumableBorrowings\Schemas;

use App\Models\ConsumableItem;
use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ConsumableBorrowingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                // ── Informasi Peminjam ─────────────────────────────────────
                Select::make('user_id')
                    ->label('Pengguna')
                    ->relationship('user', 'name')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih pengguna')
                    ->required()
                    ->columnSpan(1),

                DateTimePicker::make('borrowed_at')
                    ->label('Tanggal Pengambilan')
                    ->required()
                    ->default(now())
                    ->placeholder('Pilih tanggal pengambilan')
                    ->columnSpan(1),

                // ── Persediaan ─────────────────────────────────────────────
                Select::make('consumable_item_id')
                    ->label('Persediaan')
                    ->relationship('consumableItem', 'name')
                    ->options(
                        // Tampilkan hanya yang masih ada stok, dengan info stok & satuan
                        ConsumableItem::inStock()
                            ->get()
                            ->mapWithKeys(fn($item) => [
                                $item->id => $item->sku
                                    ? "{$item->name} ({$item->sku}) — Stok: {$item->quantity} {$item->unit}"
                                    : "{$item->name} — Stok: {$item->quantity} {$item->unit}",
                            ])
                            ->toArray()
                    )
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih persediaan')
                    ->required()
                    ->live()
                    ->helperText('Hanya persediaan dengan stok tersedia yang ditampilkan.')
                    ->afterStateUpdated(fn($set) => $set('quantity', 1))
                    ->columnSpanFull(),

                TextInput::make('quantity')
                    ->label('Jumlah')
                    ->numeric()
                    ->minValue(1)
                    ->maxValue(function ($get) {
                        $item = ConsumableItem::find($get('consumable_item_id'));
                        return $item?->quantity ?? 9999;
                    })
                    ->required()
                    ->default(1)
                    ->placeholder('Masukkan jumlah')
                    ->suffix(function ($get) {
                        $item = ConsumableItem::find($get('consumable_item_id'));
                        return $item?->unit ?? null;
                    })
                    ->helperText(function ($get) {
                        $item = ConsumableItem::find($get('consumable_item_id'));
                        return $item
                            ? "Stok tersedia: {$item->quantity} {$item->unit}"
                            : 'Pilih persediaan terlebih dahulu';
                    })
                    ->columnSpan(1),

                // ── Status ─────────────────────────────────────────────────
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'finished' => 'Finished',
                        'rejected' => 'Rejected',
                        'canceled' => 'Canceled',
                    ])
                    ->default('pending')
                    ->placeholder('Pilih status')
                    ->required()
                    ->columnSpan(1),

                // ── Catatan ────────────────────────────────────────────────
                Textarea::make('notes')
                    ->label('Catatan')
                    ->placeholder('Tambahkan catatan (opsional)')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }
}
