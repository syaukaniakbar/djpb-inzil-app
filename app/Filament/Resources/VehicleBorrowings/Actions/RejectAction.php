<?php

namespace App\Filament\Resources\VehicleBorrowings\Actions;

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
            ->modalHeading('Tolak Permintaan Kendaraan')
            ->modalDescription('Apakah Anda yakin ingin menolak permintaan peminjaman kendaraan ini?')
            ->modalSubmitActionLabel('Ya, tolak')
            ->modalCancelActionLabel('Batal')
            ->action(function ($record) {
                // Perbarui status menjadi ditolak
                $record->update([
                    'status' => 'rejected',
                ]);

                Notification::make()
                    ->title('Permintaan kendaraan berhasil ditolak')
                    ->body('Peminjaman kendaraan atas nama ' . $record->user->name . ' telah ditolak.')
                    ->danger()
                    ->icon('heroicon-o-x-circle')
                    ->send();
            })
            ->visible(fn($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
    }
}