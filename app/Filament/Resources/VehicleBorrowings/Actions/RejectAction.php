<?php

namespace App\Filament\Resources\VehicleBorrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class RejectAction
{
    public static function make(): Action
    {
        return Action::make('reject')
            ->label('Reject')
            ->color('danger')
            ->requiresConfirmation()
            ->modalHeading('Reject Vehicle Request')
            ->modalDescription('Are you sure you want to reject this vehicle request?')
            ->modalSubmitActionLabel('Yes, reject')
            ->action(function ($record) {
                // Update the record to mark as rejected (canceled)
                $record->update([
                    'status' => 'canceled',
                ]);

                Notification::make()
                    ->title('Vehicle request rejected')
                    ->danger()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
    }
}