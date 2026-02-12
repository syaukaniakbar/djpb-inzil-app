<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\BookingRoomsImport;

class BookingRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Excel::import(new BookingRoomsImport, database_path('seeders/data/room_bookings_import.xlsx'));
    }
}