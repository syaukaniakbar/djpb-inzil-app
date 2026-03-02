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
            ->icon('heroicon-o-check-circle')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Setujui Permintaan Kendaraan')
            ->modalDescription('Apakah Anda yakin ingin menyetujui permintaan peminjaman kendaraan ini?')
            ->modalSubmitActionLabel('Ya, setujui')
            ->modalCancelActionLabel('Batal')
            ->action(function ($record) {
                // Perbarui data untuk menandai sebagai disetujui (berlangsung)
                $record->update([
                    'status' => 'approved',
                ]);

                Notification::make()
                    ->title('Permintaan kendaraan berhasil disetujui')
                    ->body('Peminjaman kendaraan atas nama ' . $record->user->name . ' telah disetujui.')
                    ->success()
                    ->icon('heroicon-o-check-circle')
                    ->send();
            })
            ->visible(fn($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
    }

}