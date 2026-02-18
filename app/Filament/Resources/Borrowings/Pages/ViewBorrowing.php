<?php

namespace App\Filament\Resources\Borrowings\Pages;

use App\Filament\Resources\Borrowings\BorrowingResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\Borrowings\Actions\ApproveAction;
use App\Filament\Resources\Borrowings\Actions\RejectAction;
use App\Filament\Resources\Borrowings\Actions\MarkAsReturnedAction;
use App\Filament\Resources\Borrowings\Actions\ReturnAssetAction;

class ViewBorrowing extends ViewRecord
{
    protected static string $resource = BorrowingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            ApproveAction::make(),
            RejectAction::make(),
            MarkAsReturnedAction::make(),
            ReturnAssetAction::make(),
        ];
    }
}