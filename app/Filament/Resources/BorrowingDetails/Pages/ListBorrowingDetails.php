<?php

namespace App\Filament\Resources\BorrowingDetails\Pages;

use App\Filament\Resources\BorrowingDetails\BorrowingDetailResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBorrowingDetails extends ListRecords
{
    protected static string $resource = BorrowingDetailResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
