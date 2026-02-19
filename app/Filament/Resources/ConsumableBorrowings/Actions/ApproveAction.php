<?php

namespace App\Filament\Resources\ConsumableBorrowings\Actions;

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
            ->modalHeading('Setujui Pengambilan Persediaan')
            ->modalDescription('Apakah Anda yakin ingin menyetujui pengambilan persediaan ini?')
            ->modalSubmitActionLabel('Ya, setujui')
            ->action(function ($record) {
                // Perbarui status menjadi finished
                $record->update([
                    'status' => 'finished',
                ]);

                Notification::make()
                    ->title('Pengambilan persediaan berhasil disetujui')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) => $record->status === 'pending');
    }
}
