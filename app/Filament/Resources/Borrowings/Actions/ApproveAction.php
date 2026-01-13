<?php

namespace App\Filament\Resources\Borrowings\Actions;

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
            ->modalHeading('Setujui Permintaan Peminjaman')
            ->modalDescription('Apakah Anda yakin ingin menyetujui permintaan peminjaman ini?')
            ->modalSubmitActionLabel('Ya, setujui')
            ->action(function ($record) {
                // Perbarui status peminjaman
                $record->update([
                    'status' => 'approved',
                ]);

                Notification::make()
                    ->title('Permintaan peminjaman berhasil disetujui')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) =>
                auth()->user()->role === 'admin' &&
                $record->status === 'pending'
            );
    }
}
