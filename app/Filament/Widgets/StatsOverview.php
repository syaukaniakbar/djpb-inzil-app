<?php

namespace App\Filament\Widgets;

use App\Models\Borrowing;
use App\Models\VehicleBorrowing;
use App\Models\BookingRoom;
use App\Models\Inventory;
use App\Models\Vehicle;
use App\Models\Room;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Peminjaman Barang', Borrowing::active()->count())
                ->description('Jumlah total peminjaman inventaris')
                ->descriptionIcon('heroicon-m-arrow-trending-up'),

            Stat::make('Total Peminjaman Kendaraan', VehicleBorrowing::active()->count())
                ->description('Jumlah total peminjaman kendaraan')
                ->descriptionIcon('heroicon-m-arrow-trending-up'),


            Stat::make('Total Pemesanan Ruangan', BookingRoom::active()->count())
                ->description('Jumlah total pemesanan ruangan')
                ->descriptionIcon('heroicon-m-arrow-trending-up'),

            Stat::make('Total Inventaris', Inventory::count())
                ->description('Jumlah total item inventaris')
                ->descriptionIcon('heroicon-m-building-storefront')
                ->color('success'),

            Stat::make('Total Kendaraan', Vehicle::count())
                ->description('Jumlah total kendaraan')
                ->descriptionIcon('heroicon-m-truck')
                ->color('warning'),

            Stat::make('Total Ruangan', Room::count())
                ->description('Jumlah total ruangan')
                ->descriptionIcon('heroicon-m-home')
                ->color('info'),
        ];
    }
}