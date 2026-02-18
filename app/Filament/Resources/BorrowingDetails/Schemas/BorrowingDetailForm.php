<?php

namespace App\Filament\Resources\BorrowingDetails\Schemas;

use App\Models\Borrowing;
use App\Models\Inventory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BorrowingDetailForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Select::make('borrowing_id')
                    ->label('ID Peminjaman')
                    ->relationship('borrowing', 'id')
                    ->getOptionLabelFromRecordUsing(
                        fn($record) =>
                        '#ID : ' . $record->id . ' - ' . $record->user->name
                    )
                    ->searchable()
                    ->preload()
                    ->required()
                    ->reactive(),

                Select::make('inventory_id')
                    ->label('Aset')
                    ->relationship('inventory', 'name')
                    ->options(Inventory::all()->mapWithKeys(fn($item) => [$item->id => $item->name . ' (' . $item->serial_number . ')']))
                    ->searchable()
                    ->preload()
                    ->required()
                    ->reactive(),
                TextInput::make('quantity')
                    ->label('Jumlah')
                    ->required()
                    ->numeric()
                    ->default(1)
                    ->minValue(1)
                    ->maxValue(function (callable $get) {
                        $inventoryId = $get('inventory_id');
                        if (!$inventoryId) {
                            return 999999; // High number if no inventory selected
                        }
                        
                        $inventory = Inventory::find($inventoryId);
                        if (!$inventory) {
                            return 999999; // High number if inventory not found
                        }
                        
                        // For the standalone form, we'll rely on model validation
                        return $inventory->getAvailableQuantityAttribute();
                    })
                    ->helperText(function (callable $get) {
                        $inventoryId = $get('inventory_id');
                        if (!$inventoryId) {
                            return 'Silakan pilih aset terlebih dahulu';
                        }
                        
                        $inventory = Inventory::find($inventoryId);
                        if (!$inventory) {
                            return 'Aset tidak ditemukan';
                        }
                        
                        $available = $inventory->getAvailableQuantityAttribute();
                        return "Tersedia: {$available}";
                    }),
                Textarea::make('notes')
                    ->label('Catatan')
                    ->columnSpanFull(),
            ]);
    }
}
