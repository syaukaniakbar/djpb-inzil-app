<?php

namespace App\Filament\Resources\ConsumableBorrowings\Actions;

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
            ->modalHeading('Tolak Pengambilan Persediaan')
            ->modalDescription('Apakah Anda yakin ingin menolak pengambilan persediaan ini? Stok akan dikembalikan.')
            ->modalSubmitActionLabel('Ya, tolak')
            ->action(function ($record) {
                // Perbarui status menjadi ditolak (stok akan dikembalikan)
                $record->update([
                    'status' => 'rejected',
                ]);

                // Kembalikan stok
                $consumableItem = $record->consumableItem;
                if ($consumableItem) {
                    $consumableItem->increment('quantity', $record->quantity);
                }

                Notification::make()
                    ->title('Pengambilan persediaan berhasil ditolak')
                    ->body('Stok telah dikembalikan.')
                    ->danger()
                    ->send();
            })
            ->visible(fn ($record) => $record->status === 'pending');
    }
}
