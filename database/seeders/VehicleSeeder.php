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
        ]);
    }
}
