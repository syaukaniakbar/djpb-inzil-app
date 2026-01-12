<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        DB::table('inventories')->insert([
            [
                'name' => 'Laptop Dell XPS 13',
                'serial_number' => 'LAP-001-2024',
                'description' => 'Dell XPS 13 laptop with i7 processor, 16GB RAM, 512GB SSD',
                'category' => 'Electronics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'HP LaserJet Pro M404n',
                'serial_number' => 'PRN-002-2024',
                'description' => 'Monochrome laser printer with network connectivity',
                'category' => 'Office Equipment',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Ergonomic Office Chair',
                'serial_number' => 'CHA-003-2024',
                'description' => 'Adjustable ergonomic office chair with lumbar support',
                'category' => 'Furniture',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Samsung 32" Monitor',
                'serial_number' => 'MON-004-2024',
                'description' => '32-inch curved gaming monitor with 144Hz refresh rate',
                'category' => 'Electronics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Logitech Wireless Keyboard',
                'serial_number' => 'KEY-005-2024',
                'description' => 'Wireless keyboard with number pad and multimedia keys',
                'category' => 'Computer Accessories',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Logitech MX Master 3 Mouse',
                'serial_number' => 'MOU-006-2024',
                'description' => 'Wireless mouse with precision scroll wheel and customizable buttons',
                'category' => 'Computer Accessories',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Standing Desk Converter',
                'serial_number' => 'DES-007-2024',
                'description' => 'Electric height-adjustable standing desk converter',
                'category' => 'Furniture',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Sony WH-1000XM4 Headphones',
                'serial_number' => 'HDP-008-2024',
                'description' => 'Wireless noise-canceling headphones with premium sound quality',
                'category' => 'Electronics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Document Scanner',
                'serial_number' => 'SCN-009-2024',
                'description' => 'High-speed document scanner with automatic document feeder',
                'category' => 'Office Equipment',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Wireless Charging Pad',
                'serial_number' => 'WCP-010-2024',
                'description' => 'Fast wireless charging pad compatible with Qi-enabled devices',
                'category' => 'Electronics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}