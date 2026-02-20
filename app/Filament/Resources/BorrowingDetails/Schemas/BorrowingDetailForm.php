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
                    ->options(function () {
                        return Inventory::whereDoesntHave('borrowingDetails', function ($q) {
                            $q->whereHas('borrowing', function ($borrowingQuery) {
                                $borrowingQuery->whereIn('status', ['pending', 'approved', 'ongoing']);
                            });
                        })->get()
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
