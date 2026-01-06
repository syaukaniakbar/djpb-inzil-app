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
            ->color('danger')
            ->requiresConfirmation()
            ->modalHeading('Tolak Permintaan Kendaraan')
            ->modalDescription('Apakah Anda yakin ingin menolak permintaan kendaraan ini?')
            ->modalSubmitActionLabel('Ya, tolak')
            ->action(function ($record) {
                // Perbarui status menjadi ditolak
                $record->update([
                    'status' => 'rejected',
                ]);

                Notification::make()
                    ->title('Permintaan kendaraan berhasil ditolak')
                    ->danger()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
    }
}