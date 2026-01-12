<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BorrowingDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get available borrowing and inventory IDs to ensure we have valid foreign keys
        $borrowingIds = DB::table('borrowings')->pluck('id')->toArray();
        $inventoryIds = DB::table('inventories')->pluck('id')->toArray();
        
        // If no borrowings or inventories exist, we can't create borrowing details
        if (empty($borrowingIds) || empty($inventoryIds)) {
            $this->command->error('Please run InventorySeeder and BorrowingSeeder first before running BorrowingDetailSeeder.');
            return;
        }

        // Create borrowing details by pairing borrowings with inventories
        $borrowingDetailData = [];
        $detailCount = min(count($borrowingIds), count($inventoryIds), 10); // Create up to 10 records
        
        for ($i = 0; $i < $detailCount; $i++) {
            $borrowingId = $borrowingIds[$i % count($borrowingIds)];
            $inventoryId = $inventoryIds[$i % count($inventoryIds)];
            
            $borrowingDetailData[] = [
                'borrowing_id' => $borrowingId,
                'inventory_id' => $inventoryId,
                'quantity' => rand(1, 3), // Random quantity between 1 and 3
                'notes' => "Detail record for borrowing #{$borrowingId} and inventory #{$inventoryId}",
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('borrowing_details')->insert($borrowingDetailData);
    }
}