<?php

namespace App\Filament\Resources\BookingRooms\Actions;

use Filament\Actions\Action;
use Filament\Notifications\Notification;

class MarkAsUsedAction
{
    public static function make(): Action
    {
        return Action::make('mark_as_used')
            ->label('Mark as Used')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Mark Room as Used')
            ->modalDescription('Are you sure you want to mark this room as used?')
            ->modalSubmitActionLabel('Yes, mark as used')
            ->action(function ($record) {
                
                // Update the record to mark as used
                $record->update([
                    'status' => 'finished',
                ]);

                Notification::make()
                    ->title('Room marked as used')
                    ->success()
                    ->send();
            })
            ->visible(fn ($record) => auth()->user()->role === 'admin' && $record->status === 'ongoing');
    }
}