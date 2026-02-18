<?php

namespace App\Filament\Resources\Borrowings\RelationManagers;

use App\Models\Borrowing;
use App\Models\Inventory;
use App\Models\BorrowingDetail;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class BorrowingDetailRelationManager extends RelationManager
{
    protected static string $relationship = 'borrowingDetails';

    /**
     * Form (Filament 4 – NON static)
     */
    public function form(Schema $schema): Schema
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
                        $currentRecord = $this->getOwnerRecord(); // This gets the parent borrowing record
            
                        if (!$inventoryId) {
                            return 1; // Default to 1 if no inventory selected
                        }

                        $inventory = Inventory::find($inventoryId);
                        if (!$inventory) {
                            return 1; // Default to 1 if inventory not found
                        }

                        // If we're editing an existing record, we need to account for the current value
                        $currentRecordId = $this->getMountedFormComponentRecord()?->getKey();
                        if ($currentRecordId) {
                            // Editing existing record - exclude this record's quantity from calculation
                            $existingDetail = BorrowingDetail::find($currentRecordId);
                            if ($existingDetail) {
                                return $inventory->getAvailableQuantityExcludingBorrowing($existingDetail->borrowing) + $existingDetail->quantity;
                            } else {
                                return $inventory->getAvailableQuantityAttribute();
                            }
                        } else {
                            // Creating new record
                            return $inventory->getAvailableQuantityAttribute();
                        }
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

                        // If we're editing an existing record, adjust the available count
                        $currentRecordId = $this->getMountedFormComponentRecord()?->getKey();
                        if ($currentRecordId) {
                            // Editing existing record
                            $existingDetail = BorrowingDetail::find($currentRecordId);
                            if ($existingDetail) {
                                $available = $inventory->getAvailableQuantityExcludingBorrowing($existingDetail->borrowing) + $existingDetail->quantity;
                                return "Tersedia: {$available} (termasuk {$existingDetail->quantity} dari entri ini)";
                            } else {
                                $available = $inventory->getAvailableQuantityAttribute();
                                return "Tersedia: {$available}";
                            }
                        } else {
                            // Creating new record
                            $available = $inventory->getAvailableQuantityAttribute();
                            return "Tersedia: {$available}";
                        }
                    }),

                Textarea::make('notes')
                    ->label('Catatan')
                    ->columnSpanFull(),
            ]);
    }

    /**
     * Table (NON static)
     */
    public function table(Table $table): Table
    {
        return BorrowingDetailsTable::configure($table);
    }
}
