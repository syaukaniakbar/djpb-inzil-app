<?php

namespace App\Filament\Resources\Borrowings\Pages;

use App\Filament\Resources\Borrowings\BorrowingResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\Borrowings\Actions\ApproveAction;
use App\Filament\Resources\Borrowings\Actions\RejectAction;
use App\Filament\Resources\Borrowings\Actions\MarkAsReturnedAction;

class EditBorrowing extends EditRecord
{
    protected static string $resource = BorrowingResource::class;

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
