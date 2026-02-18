<?php

namespace App\Filament\Resources\VehicleBorrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class ReturnVehicleAction
{
    public static function make(): Action
    {
        return Action::make('return_vehicle')
            ->label('Kembalikan')
            ->color('primary')
            ->requiresConfirmation()
            ->modalHeading('Kembalikan Kendaraan')
            ->modalDescription('Apakah Anda yakin kendaraan sudah dikembalikan?')
            ->modalSubmitActionLabel('Ya, kembalikan')
            ->modalCancelActionLabel('Batal')
            ->action(function ($record) {
                // Check if the authenticated user owns this borrowing
                if ($record->user_id !== auth()->id()) {
                    throw new \Exception('Anda tidak memiliki izin untuk mengembalikan peminjaman ini.');
                }

                // Call the service to handle the return
                $vehicleBorrowingService = app(\App\Services\VehicleBorrowingService::class);
                $vehicleBorrowingService->returnVehicleBorrowing($record);

                Notification::make()
                    ->title('Kendaraan berhasil dikembalikan')
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