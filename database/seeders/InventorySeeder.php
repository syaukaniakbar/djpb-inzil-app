<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create initial inventory records if they don't exist
        $inventoryItems = [
            [
                'name' => 'Laptop Dell XPS 13',
                'serial_number' => 'LAP-XPS-001',
                'description' => 'Dell XPS 13 laptop computer',
                'category' => 'Electronics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'HP LaserJet Pro M404n',
                'serial_number' => 'PRN-HP-001',
                'description' => 'HP LaserJet Pro M404n printer',
                'category' => 'Office Equipment',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Ergonomic Office Chair',
                'serial_number' => 'CHR-ERG-001',
                'description' => 'Adjustable ergonomic office chair',
                'category' => 'Furniture',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Samsung 32" Monitor',
                'serial_number' => 'MON-SAM-001',
                'description' => 'Samsung 32-inch LED monitor',
                'category' => 'Electronics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Logitech Wireless Keyboard',
                'serial_number' => 'KYB-LGT-001',
                'description' => 'Logitech wireless keyboard',
                'category' => 'Accessories',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Logitech MX Master 3 Mouse',
                'serial_number' => 'MOU-LGT-001',
                'description' => 'Logitech MX Master 3 wireless mouse',
                'category' => 'Accessories',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Standing Desk Converter',
                'serial_number' => 'DSK-STN-001',
                'description' => 'Adjustable standing desk converter',
                'category' => 'Furniture',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Sony WH-1000XM4 Headphones',
                'serial_number' => 'HDP-SNY-001',
                'description' => 'Sony noise-canceling headphones',
                'category' => 'Electronics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Document Scanner',
                'serial_number' => 'SCN-DOC-001',
                'description' => 'High-speed document scanner',
                'category' => 'Office Equipment',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Wireless Charging Pad',
                'serial_number' => 'CHG-WRL-001',
                'description' => 'Universal wireless charging pad',
                'category' => 'Accessories',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        // Insert inventory items if they don't already exist
        foreach ($inventoryItems as $item) {
            DB::table('inventories')->updateOrInsert(
                ['name' => $item['name']], // condition to check
                $item // data to insert/update
            );
        }
    }
}