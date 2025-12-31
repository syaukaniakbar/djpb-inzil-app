<?php

namespace App\Filament\Resources\VehicleBorrowings\Pages;

use App\Filament\Resources\VehicleBorrowings\VehicleBorrowingResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\VehicleBorrowings\Actions\ApproveAction;
use App\Filament\Resources\VehicleBorrowings\Actions\RejectAction;
use App\Filament\Resources\VehicleBorrowings\Actions\MarkAsReturnedAction;

class EditVehicleBorrowing extends EditRecord
{
    protected static string $resource = VehicleBorrowingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            ApproveAction::make(),
            RejectAction::make(),
            MarkAsReturnedAction::make(),
            DeleteAction::make(),
        ];
    }
}
