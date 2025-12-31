<?php

namespace App\Filament\Resources\VehicleBorrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class ApproveAction
{
    public static function make(): Action
    {
        return Action::make('approve')
            ->label('Approve')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Approve Vehicle Request')
            ->modalDescription('Are you sure you want to approve this vehicle request?')
            ->modalSubmitActionLabel('Yes, approve')
            ->action(function ($record) {
                // Update the record to mark as approved (ongoing)
                $record->update([
                    'status' => 'ongoing',
                ]);

                Notification::make()
                    ->title('Vehicle request approved')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'pending');
    }
}