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
                'name' => 'Toyota Rush',
                'license_plate' => 'KT 1187',
                'brand' => 'Toyota',
                'model' => 'Rush',
                'color' => 'Hitam',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2026-05-20',
                'year' => 2021,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Toyota Rush',
                'license_plate' => 'KT 1614',
                'brand' => 'Toyota',
                'model' => 'Rush',
                'color' => 'Putih',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2025-11-15',
                'year' => 2020,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Daihatsu Terios',
                'license_plate' => 'KT 1837',
                'brand' => 'Daihatsu',
                'model' => 'Terios',
                'color' => 'Hitam',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2026-02-10',
                'year' => 2022,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Honda CRV',
                'license_plate' => 'KT 1938',
                'brand' => 'Honda',
                'model' => 'CRV',
                'color' => 'Hitam',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2026-08-01',
                'year' => 2021,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Toyota Innova',
                'license_plate' => 'KT 1939',
                'brand' => 'Toyota',
                'model' => 'Innova',
                'color' => 'Hitam',
                'fuel_type' => 'Bensin',
                'registration_expiry' => '2025-12-20',
                'year' => 2019,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

    }
}
