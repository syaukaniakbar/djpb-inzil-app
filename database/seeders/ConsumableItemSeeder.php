<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ConsumableItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('consumable_items')->insert([
            [
                'name' => 'Kertas A4',
                'sku' => 'KM-A4-001',
                'description' => 'Kertas HVS A4 80 GSM',
                'category' => 'Alat Tulis Kantor',
                'quantity' => 500,
                'min_stock' => 100,
                'unit' => 'rim',
                'location' => 'Gudang A - Rak 1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Pulpen Standard',
                'sku' => 'ATK-PEN-002',
                'description' => 'Pulpen hitam standar',
                'category' => 'Alat Tulis Kantor',
                'quantity' => 200,
                'min_stock' => 50,
                'unit' => 'pcs',
                'location' => 'Gudang A - Rak 2',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Tinta Printer Canon',
                'sku' => 'TNT-CAN-003',
                'description' => 'Tinta printer Canon CLI-47 Black',
                'category' => 'Tinta & Toner',
                'quantity' => 25,
                'min_stock' => 10,
                'unit' => 'pcs',
                'location' => 'Gudang B - Rak 1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Stapler Besar',
                'sku' => 'ATK-STP-004',
                'description' => 'Stapler kapasitas 50 lembar',
                'category' => 'Alat Tulis Kantor',
                'quantity' => 30,
                'min_stock' => 10,
                'unit' => 'pcs',
                'location' => 'Gudang A - Rak 3',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Folder Dokumen',
                'sku' => 'FLD-DOK-005',
                'description' => 'Folder plastik dokumen warna warni',
                'category' => 'Organisasi Dokumen',
                'quantity' => 150,
                'min_stock' => 30,
                'unit' => 'pcs',
                'location' => 'Gudang A - Rak 4',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
