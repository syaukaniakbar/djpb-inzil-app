<?php

namespace App\Filament\Resources\BookingRooms\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class ApproveAction
{
    public static function make(): Action
    {
        return Action::make('approve')
            ->label('Setujui')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Setujui Permintaan Ruangan')
            ->modalDescription('Apakah Anda yakin ingin menyetujui permintaan ruangan ini?')
            ->modalSubmitActionLabel('Ya, setujui')
            ->action(function ($record) {
                // Update data untuk menandai sebagai ongoing
                $record->update([
                    'status' => 'ongoing',
                ]);

                Notification::make()
                    ->title('Permintaan ruangan berhasil disetujui')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'pending');

    }
}