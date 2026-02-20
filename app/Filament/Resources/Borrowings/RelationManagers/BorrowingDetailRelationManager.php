<?php

namespace App\Filament\Resources\Borrowings\RelationManagers;

use App\Models\Inventory;
use App\Models\BorrowingDetail;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

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
                Select::make('inventory_id')
                    ->label('Aset')
                    ->options(function () {
                        /** @var \App\Models\Borrowing $borrowing */
                        $borrowing = $this->getOwnerRecord();

                        // IDs already attached to this borrowing (to avoid duplicates in the same borrowing)
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

    /**
     * Table (NON static)
     */
    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('inventory.name')
                    ->label('Aset')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('inventory.serial_number')
                    ->label('Nomor Seri')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('notes')
                    ->label('Catatan')
                    ->limit(30)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                //
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->label('Hapus')
                        ->modalHeading('Hapus Detail Peminjaman')
                        ->modalDescription('Apakah Anda yakin ingin menghapus detail peminjaman ini?')
                        ->modalSubmitActionLabel('Ya, Hapus')
                        ->modalCancelActionLabel('Batal'),
                ]),
            ]);
    }
}
