<?php

namespace App\Filament\Resources\ConsumableItems\Pages;

use App\Filament\Resources\ConsumableItems\ConsumableItemResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListConsumableItems extends ListRecords
{
    protected static string $resource = ConsumableItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
