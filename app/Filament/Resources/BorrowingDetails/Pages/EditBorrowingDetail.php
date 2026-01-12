<?php

namespace App\Filament\Resources\BorrowingDetails\Pages;

use App\Filament\Resources\BorrowingDetails\BorrowingDetailResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditBorrowingDetail extends EditRecord
{
    protected static string $resource = BorrowingDetailResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
