<?php

namespace App\Filament\Resources\VehicleBorrowings\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class MarkAsReturnedAction
{
    public static function make(): Action
    {
        return Action::make('mark_as_returned')
            ->label('Mark as Returned')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Mark Vehicle as Returned')
            ->modalDescription('Are you sure you want to mark this vehicle as returned?')
            ->modalSubmitActionLabel('Yes, mark as returned')
            ->action(function ($record) {
                // Update the record to mark as returned
                $record->update([
                    'end_at' => now(),
                    'status' => 'finished',
                ]);

                Notification::make()
                    ->title('Vehicle marked as returned')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'ongoing' && is_null($record->end_at));
    }
}