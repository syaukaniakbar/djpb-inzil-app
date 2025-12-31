<?php

namespace App\Filament\Resources\VehicleBorrowings\Pages;

use App\Filament\Resources\VehicleBorrowings\VehicleBorrowingResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\VehicleBorrowings\Actions\ApproveAction;
use App\Filament\Resources\VehicleBorrowings\Actions\RejectAction;
use App\Filament\Resources\VehicleBorrowings\Actions\MarkAsReturnedAction;

class ViewVehicleBorrowing extends ViewRecord
{
    protected static string $resource = VehicleBorrowingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            ApproveAction::make(),
            RejectAction::make(),
            MarkAsReturnedAction::make(),
        ];
    }
}
