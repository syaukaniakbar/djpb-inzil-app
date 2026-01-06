<?php

namespace App\Filament\Resources\BookingRooms\Actions;

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
            ->modalHeading('Tolak Permintaan Ruangan')
            ->modalDescription('Apakah Anda yakin ingin menolak permintaan ruangan ini?')
            ->modalSubmitActionLabel('Ya, tolak')
            ->action(function ($record) {
                // Update data untuk menandai sebagai ditolak (dibatalkan)
                $record->update([
                    'status' => 'rejected',
                ]);

                Notification::make()
                    ->title('Permintaan ruangan berhasil ditolak')
                    ->danger()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
    }
}