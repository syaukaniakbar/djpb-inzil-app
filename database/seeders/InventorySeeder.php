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
        // Update existing inventory items to set quantity
        DB::table('inventories')->where('name', 'Laptop Dell XPS 13')->update(['quantity' => 5]);
        DB::table('inventories')->where('name', 'HP LaserJet Pro M404n')->update(['quantity' => 2]);
        DB::table('inventories')->where('name', 'Ergonomic Office Chair')->update(['quantity' => 10]);
        DB::table('inventories')->where('name', 'Samsung 32" Monitor')->update(['quantity' => 8]);
        DB::table('inventories')->where('name', 'Logitech Wireless Keyboard')->update(['quantity' => 15]);
        DB::table('inventories')->where('name', 'Logitech MX Master 3 Mouse')->update(['quantity' => 15]);
        DB::table('inventories')->where('name', 'Standing Desk Converter')->update(['quantity' => 5]);
        DB::table('inventories')->where('name', 'Sony WH-1000XM4 Headphones')->update(['quantity' => 12]);
        DB::table('inventories')->where('name', 'Document Scanner')->update(['quantity' => 3]);
        DB::table('inventories')->where('name', 'Wireless Charging Pad')->update(['quantity' => 20]);

        // Set quantity to 1 for any inventory items that don't have a quantity set
        DB::table('inventories')->whereNull('quantity')->update(['quantity' => 1]);
    }
}