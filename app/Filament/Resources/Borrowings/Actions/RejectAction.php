<?php

namespace App\Filament\Resources\Borrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class RejectAction
{
    public static function make(): Action
    {
        return Action::make('reject')
            ->label('Tolak')
            ->icon('heroicon-o-x-circle')
            ->color('danger')
            ->requiresConfirmation()
            ->modalHeading('Tolak Permintaan Peminjaman')
            ->modalDescription('Apakah Anda yakin ingin menolak permintaan peminjaman ini?')
            ->modalSubmitActionLabel('Ya, tolak')
            ->modalCancelActionLabel('Batal')
            ->action(function ($record) {
                // Perbarui status menjadi ditolak
                $record->update([
                    'status' => 'rejected',
                ]);

                Notification::make()
                    ->title('Permintaan peminjaman berhasil ditolak')
                    ->body('Peminjaman atas nama ' . $record->user->name . ' telah ditolak.')
                    ->danger()
                    ->icon('heroicon-o-x-circle')
                    ->send();
            })
            ->visible(fn($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
    }
}
