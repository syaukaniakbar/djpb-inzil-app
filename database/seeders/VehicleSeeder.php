<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vehicles')->insert([
            [
                'name' => 'Toyota Avanza',
                'license_plate' => 'B 1234 ABC',
                'brand' => 'Toyota',
                'model' => 'Avanza',
                'color' => 'Hitam',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2026-05-20',
                'year' => 2021,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Mitsubishi Pajero',
                'license_plate' => 'B 5678 DEF',
                'brand' => 'Mitsubishi',
                'model' => 'Pajero Sport',
                'color' => 'Putih',
                'fuel_type' => 'Solar',
                'registration_expiry' => '2025-11-15',
                'year' => 2020,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Honda CR-V',
                'license_plate' => 'B 9012 GHI',
                'brand' => 'Honda',
                'model' => 'CR-V',
                'color' => 'Abu-abu',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2026-02-10',
                'year' => 2022,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Suzuki Ertiga',
                'license_plate' => 'B 2345 JKL',
                'brand' => 'Suzuki',
                'model' => 'Ertiga',
                'color' => 'Silver',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2026-08-01',
                'year' => 2021,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Daihatsu Xenia',
                'license_plate' => 'B 6789 MNO',
                'brand' => 'Daihatsu',
                'model' => 'Xenia',
                'color' => 'Putih',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2025-12-20',
                'year' => 2019,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Toyota Fortuner',
                'license_plate' => 'B 3456 PQR',
                'brand' => 'Toyota',
                'model' => 'Fortuner',
                'color' => 'Hitam',
                'fuel_type' => 'Solar',
                'registration_expiry' => '2026-03-18',
                'year' => 2022,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Honda Brio',
                'license_plate' => 'B 7890 STU',
                'brand' => 'Honda',
                'model' => 'Brio',
                'color' => 'Merah',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2025-09-09',
                'year' => 2020,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Toyota Innova',
                'license_plate' => 'B 4567 VWX',
                'brand' => 'Toyota',
                'model' => 'Innova',
                'color' => 'Abu-abu',
                'fuel_type' => 'Solar',
                'registration_expiry' => '2026-01-30',
                'year' => 2021,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Nissan X-Trail',
                'license_plate' => 'B 8901 YZA',
                'brand' => 'Nissan',
                'model' => 'X-Trail',
                'color' => 'Hitam',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2025-10-25',
                'year' => 2019,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Wuling Alvez',
                'license_plate' => 'B 1122 BCD',
                'brand' => 'Wuling',
                'model' => 'Alvez',
                'color' => 'Biru',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2026-07-14',
                'year' => 2023,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

    }
}
