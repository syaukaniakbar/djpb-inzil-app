<?php

namespace App\Filament\Resources\VehicleBorrowings\Actions;

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
            ->modalHeading('Tandai Kendaraan Telah Dikembalikan')
            ->modalDescription('Apakah Anda yakin ingin menandai kendaraan ini sebagai telah dikembalikan?')
            ->modalSubmitActionLabel('Ya, tandai sebagai dikembalikan')
            ->action(function ($record) {
                // Update data untuk menandai sebagai dikembalikan
                $record->update([
                    'returned_at' => now(),
                    'status' => 'finished',
                ]);

                Notification::make()
                    ->title('Kendaraan berhasil ditandai sebagai dikembalikan')
                    ->success()
                    ->send();
                })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'ongoing');

    }
}