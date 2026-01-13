<?php

namespace App\Filament\Resources\Borrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class MarkAsReturnedAction
{
    public static function make(): Action
    {
        return Action::make('mark_as_returned')
            ->label('Tandai Sebagai Dikembalikan')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Tandai Peminjaman Telah Dikembalikan')
            ->modalDescription('Apakah Anda yakin ingin menandai peminjaman ini sebagai telah dikembalikan?')
            ->modalSubmitActionLabel('Ya, tandai sebagai dikembalikan')
            ->action(function ($record) {
                // Update data peminjaman
                $record->update([
                    'returned_at' => now(),
                    'status' => 'finished',
                ]);

                Notification::make()
                    ->title('Peminjaman berhasil ditandai sebagai dikembalikan')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) =>
                auth()->user()->role === 'admin' &&
                $record->status === 'ongoing'
            );
    }
}
