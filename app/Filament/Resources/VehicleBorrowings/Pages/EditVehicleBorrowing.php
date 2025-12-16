<?php

namespace App\Filament\Resources\VehicleBorrowings\Pages;

use App\Filament\Resources\VehicleBorrowings\VehicleBorrowingResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditVehicleBorrowing extends EditRecord
{
    protected static string $resource = VehicleBorrowingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
