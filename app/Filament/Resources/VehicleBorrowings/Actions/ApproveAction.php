<?php

namespace App\Filament\Resources\VehicleBorrowings\Actions;

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
        ->modalHeading('Setujui Permintaan Kendaraan')
        ->modalDescription('Apakah Anda yakin ingin menyetujui permintaan kendaraan ini?')
        ->modalSubmitActionLabel('Ya, setujui')
        ->action(function ($record) {
            // Perbarui data untuk menandai sebagai disetujui (berlangsung)
            $record->update([
                'status' => 'approved',
            ]);

            Notification::make()
                ->title('Permintaan kendaraan berhasil disetujui')
                ->success()
                ->send();
        })
        ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
}

}