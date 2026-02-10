<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;
use App\Filament\Widgets\StatsOverview;
use App\Filament\Widgets\VehicleNotReturnedWidget;
use App\Filament\Widgets\InventoryNotReturnedWidget;
use App\Filament\Widgets\RoomNotReturnedWidget;

class Dashboard extends BaseDashboard
{
    protected function getHeaderWidgets(): array
    {
        return [
            StatsOverview::class,
        ];
    }

    public function getWidgets(): array
    {
        return [
            InventoryNotReturnedWidget::class,
            VehicleNotReturnedWidget::class,
            RoomNotReturnedWidget::class,
        ];
    }
}
