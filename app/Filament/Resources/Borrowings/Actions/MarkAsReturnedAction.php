<?php

namespace App\Filament\Resources\Borrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class MarkAsReturnedAction
{
    public static function make(): Action
    {
        return Action::make('mark_as_returned')
            ->label('Tandai Dikembalikan')
            ->icon('heroicon-o-arrow-left-end-on-rectangle')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Tandai Peminjaman Telah Dikembalikan')
            ->modalDescription('Apakah Anda yakin ingin menandai peminjaman ini sebagai telah dikembalikan?')
            ->modalSubmitActionLabel('Ya, tandai dikembalikan')
            ->modalCancelActionLabel('Batal')
            ->action(function ($record) {
                $record->update([
                    'returned_at' => now(),
                    'status' => 'finished',
                ]);

                Notification::make()
                    ->title('Peminjaman berhasil dikembalikan')
                    ->body('Peminjaman atas nama ' . $record->user->name . ' telah ditandai sebagai dikembalikan.')
                    ->success()
                    ->icon('heroicon-o-check-circle')
                    ->send();
            })
            ->visible(fn($record) => auth()->user()->role === 'admin' && $record->status === 'ongoing');
    }
}
