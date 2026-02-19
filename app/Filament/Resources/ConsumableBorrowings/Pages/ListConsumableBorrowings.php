<?php

namespace App\Filament\Resources\ConsumableBorrowings\Pages;

use App\Filament\Resources\ConsumableBorrowings\ConsumableBorrowingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListConsumableBorrowings extends ListRecords
{
    protected static string $resource = ConsumableBorrowingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
