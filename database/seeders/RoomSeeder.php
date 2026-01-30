<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rooms')->insert([
            ['name' => 'AULA', 'capacity' => 50, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG RAPAT LANTAI I', 'capacity' => 20, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG RAPAT LANTAI II', 'capacity' => 20, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG RAPAT MO', 'capacity' => 15, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'Mini TLC FO', 'capacity' => 18, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
        ]);
    }
}
