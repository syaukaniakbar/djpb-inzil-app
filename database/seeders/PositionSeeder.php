<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('positions')->insert([
    
    [
        'id' => 1,
        'name' => 'Kepala Bidang',
        'code' => 'KABID',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],

    [
        'id' => 2,
        'name' => 'Kepala Bagian',
        'code' => 'KABAG',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],

    [
        'id' => 3,
        'name' => 'Kepala Subbagian',
        'code' => 'KASUBBAG',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],
    [
        'id' => 4,
        'name' => 'Kepala Seksi',
        'code' => 'KASI',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],

    [
        'id' => 5,
        'name' => 'Pelaksana',
        'code' => 'PLK',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],
]);

    }
}
