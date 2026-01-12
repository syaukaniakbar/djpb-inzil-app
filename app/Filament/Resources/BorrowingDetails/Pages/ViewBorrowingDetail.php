<?php

namespace App\Filament\Resources\BorrowingDetails\Pages;

use App\Filament\Resources\BorrowingDetails\BorrowingDetailResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewBorrowingDetail extends ViewRecord
{
    protected static string $resource = BorrowingDetailResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
