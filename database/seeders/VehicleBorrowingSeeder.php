<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\VehicleBorrowingsImport;

class VehicleBorrowingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Excel::import(new VehicleBorrowingsImport, database_path('seeders/data/vehicle_borrowings_import.xlsx'));
    }
}