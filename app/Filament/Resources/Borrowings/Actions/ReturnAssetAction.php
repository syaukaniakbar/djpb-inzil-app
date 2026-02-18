<?php

namespace App\Filament\Resources\Borrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class ReturnAssetAction
{
    public static function make(): Action
    {
        return Action::make('return_asset')
            ->label('Kembalikan')
            ->color('primary')
            ->requiresConfirmation()
            ->modalHeading('Kembalikan Aset')
            ->modalDescription('Apakah Anda yakin aset sudah dikembalikan?')
            ->modalSubmitActionLabel('Ya, kembalikan')
            ->modalCancelActionLabel('Batal')
            ->action(function ($record) {
                // Check if the authenticated user owns this borrowing
                if ($record->user_id !== auth()->id()) {
                    throw new \Exception('Anda tidak memiliki izin untuk mengembalikan peminjaman ini.');
                }

                // Call the service to handle the return
                $borrowingService = app(\App\Services\BorrowingService::class);
                $borrowingService->returnBorrowing($record);

                Notification::make()
                    ->title('Aset berhasil dikembalikan')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) => 
                $record->user_id === auth()->id() && 
                $record->status === 'ongoing' && 
                !$record->returned_at
            );
    }
}