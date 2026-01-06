<?php

namespace App\Filament\Resources\BookingRooms\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Filters\SelectFilter;

class BookingRoomsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('room.name')
                    ->label('Ruangan')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('event_mode')
                    ->label('Jenis Acara')
                    ->formatStateUsing(fn ($state) =>
                        match($state) {
                            'meeting' => 'Meeting',
                            'presentation' => 'Presentasi',
                            'training' => 'Training',
                            'interview' => 'Interview',
                            'other' => 'Lainnya',
                            default => $state
                        }
                    )
                    ->badge()
                    ->sortable(),

                TextColumn::make('event_name')
                    ->label('Nama Acara')
                    ->searchable()
                    ->limit(30),

                TextColumn::make('status')
                ->badge()
                ->colors([
                    'warning' => 'pending',
                    'success' => 'approved',
                    'info' => 'ongoing',
                    'danger' => 'rejected',
                    'success' => 'finished',
                    'secondary' => 'canceled',
                ])
                ->sortable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'ongoing' => 'Ongoing',
                        'used' => 'Used',
                        'finished' => 'Finished',
                        'canceled' => 'Canceled',
                    ]),

                SelectFilter::make('event_mode')
                    ->options([
                        'meeting' => 'Meeting',
                        'presentation' => 'Presentasi',
                        'training' => 'Training',
                        'interview' => 'Interview',
                        'other' => 'Lainnya',
                    ]),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                // Custom admin actions
                \App\Filament\Resources\BookingRooms\Actions\ApproveAction::make(),
                \App\Filament\Resources\BookingRooms\Actions\RejectAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('Tidak Ada Data Peminjaman Ruangan')
            ->emptyStateDescription('Klik tombol "Ajukan Peminjaman Ruangan" untuk membuat data baru.');
    }
}
