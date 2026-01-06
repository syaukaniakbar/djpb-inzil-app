<?php

namespace App\Filament\Resources\BookingRooms\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class MarkAsReturnedAction
{
    public static function make(): Action
    {
        return Action::make('mark_as_returned')
            ->label('Tandai Selesai Dikembalikan')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Tandai Ruangan Selesai Dikembalikan')
            ->modalDescription('Apakah Anda yakin ingin menandai ruangan ini selesai dikembalikan?')
            ->modalSubmitActionLabel('Ya, tandai selesai dikembalikan')
            ->action(function ($record) {
                
                // Update the record to mark as used
                $record->update([
                    'status' => 'finished',
                ]);

                Notification::make()
                    ->title('Ruangan berhasil ditandai sebagai selesai digunakan')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'ongoing');
    }
}