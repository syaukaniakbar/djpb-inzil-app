<?php

namespace App\Filament\Resources\Borrowings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BorrowingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('user.name')
                    ->label('User')
                    ->numeric()
                    ->sortable()
                    ->searchable(),
                TextColumn::make('start_at')
                    ->label('Start Date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('end_at')
                    ->label('End Date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('returned_at')
                    ->label('Returned Date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('notes')
                    ->limit(50)
                    ->searchable(),
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
                //
            ])
            ->recordActions([
                EditAction::make(),
                ViewAction::make(),
                // Custom admin actions
                \App\Filament\Resources\Borrowings\Actions\ApproveAction::make(),
                \App\Filament\Resources\Borrowings\Actions\RejectAction::make(),
                \App\Filament\Resources\Borrowings\Actions\MarkAsReturnedAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
