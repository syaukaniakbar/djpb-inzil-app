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
            ['name' => 'RUANG AULA', 'capacity' => 50, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG UJIAN I', 'capacity' => 20, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG UJIAN II', 'capacity' => 20, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG KONFERENSI I', 'capacity' => 15, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG KONFERENSI II', 'capacity' => 18, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
            ['name' => 'RUANG KONFERENSI III', 'capacity' => 30, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(),],
        ]);
    }
}
