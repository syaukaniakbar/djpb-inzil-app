<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departments')->insert([
            ['name' => 'BAGIAN UMUM', 'code' => 'BAGUM ', 'created_at' => Carbon::now(),  'updated_at' => Carbon::now()],
            ['name' => 'PEMBINAAN PELAKSANAAN ANGGARAN I', 'code' => 'PPA I', 'created_at' => Carbon::now(),  'updated_at' => Carbon::now()],
            ['name' => 'PEMBINAAN PELAKSANAAN ANGGARAN II', 'code' => 'PPA II', 'created_at' => Carbon::now(),  'updated_at' => Carbon::now()],
            ['name' => 'PEMBINAAN AKUNTASI DAN PELAPORAN KEUANGAN', 'code' => 'PSAPP', 'created_at' => Carbon::now(),  'updated_at' => Carbon::now()],
            ['name' => 'SUPERVISI KPPN DAN KEPATUHAN INTERNAL', 'code' => 'SKKI', 'created_at' => Carbon::now(),  'updated_at' => Carbon::now()],
            ['name' => 'ANALISIS PERBENDAHARAAN NEGARA AHLI PERTAMA', 'code' => 'APBN', 'created_at' => Carbon::now(),  'updated_at' => Carbon::now()],
        ]);
    }
}
