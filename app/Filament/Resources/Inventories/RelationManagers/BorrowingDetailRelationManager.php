<?php

namespace App\Filament\Resources\Inventories\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Forms\Components;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class BorrowingDetailRelationManager extends RelationManager
{
    protected static string $relationship = 'borrowingDetails';

    protected static ?string $recordTitleAttribute = 'borrowing.id';

    /**
     * FORM — NON STATIC (Filament 4)
     */
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Components\Select::make('borrowing_id')
                    ->relationship('borrowing', 'id')
                    ->getOptionLabelFromRecordUsing(
                        fn($record) => '#ID : ' . $record->id . ' - ' . $record->user->name
                    )
                    ->required()
                    ->searchable()
                    ->preload(),

                Components\Textarea::make('notes')
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }

    /**
     * TABLE — Filament 4
     */
    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('borrowing.user.name')
                    ->label('Peminjam')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('borrowing.start_at')
                    ->label('Tanggal Peminjaman')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('borrowing.end_at')
                    ->label('Tanggal Pengembalian')
                    ->dateTime()
                    ->sortable()
                    ->placeholder('-'),
                TextColumn::make('borrowing.returned_at')
                    ->label('Tanggal Dikembalikan')
                    ->dateTime()
                    ->sortable()
                    ->placeholder('Belum dikembalikan'),
                TextColumn::make('borrowing.status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn($state) => match($state) {
                        'pending' => 'Menunggu',
                        'approved' => 'Disetujui',
                        'ongoing' => 'Berlangsung',
                        'returned' => 'Dikembalikan',
                        'canceled' => 'Dibatalkan',
                        default => $state
                    })
                    ->color(fn($state) => match($state) {
                        'pending' => 'warning',
                        'approved' => 'info',
                        'ongoing' => 'primary',
                        'returned' => 'success',
                        'canceled' => 'danger',
                        default => 'gray'
                    }),
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
            ])
            ->defaultSort('created_at', 'desc');
    }

}
