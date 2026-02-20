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
                    ->options(function ($get) {
                        $borrowingId = $get('borrowing_id');

                        if (!$borrowingId) {
                            // No borrowing selected yet — show all inventories
                            return Inventory::all()
                                ->mapWithKeys(fn($item) => [$item->id => $item->name . ' (' . $item->serial_number . ')']);
                        }

                        $borrowing = Borrowing::find($borrowingId);

                        if (!$borrowing) {
                            return [];
                        }

                        // IDs already added to this specific borrowing (to avoid duplicates)
                        $alreadyUsedIds = $borrowing->borrowingDetails()->pluck('inventory_id')->toArray();

                        return Inventory::whereNotIn('id', $alreadyUsedIds)
                            ->whereDoesntHave('borrowingDetails', function ($q) use ($borrowing) {
                                $q->whereHas('borrowing', function ($borrowingQuery) use ($borrowing) {
                                    $borrowingQuery
                                        ->whereIn('status', ['pending', 'approved', 'ongoing'])
                                        ->where('id', '!=', $borrowing->id)
                                        ->where('start_at', '<', $borrowing->end_at)
                                        ->where('end_at', '>', $borrowing->start_at);
                                });
                            })
                            ->get()
                            ->mapWithKeys(fn($item) => [$item->id => $item->name . ' (' . $item->serial_number . ')']);
                    })
                    ->searchable()
                    ->preload()
                    ->required()
                    ->reactive()
                    ->disabledOn('edit'),
                Textarea::make('notes')
                    ->label('Catatan')
                    ->columnSpanFull(),
            ]);
    }
}

