<?php

namespace Database\Seeders;

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
        // Clear existing borrowing details to avoid conflicts
        DB::table('borrowing_details')->delete();

        // Get available borrowing and inventory IDs to ensure we have valid foreign keys
        $borrowingIds = DB::table('borrowings')->pluck('id')->toArray();
        $inventoryIds = DB::table('inventories')->pluck('id')->toArray();

        // If no borrowings or inventories exist, we can't create borrowing details
        if (empty($borrowingIds) || empty($inventoryIds)) {
            $this->command->error('Please run InventorySeeder and BorrowingSeeder first before running BorrowingDetailSeeder.');
            return;
        }

        // Ensure each borrowing has at least one inventory item associated with it
        $borrowingDetailData = [];
        $usedCombinations = []; // Track used borrowing_id and inventory_id combinations

        // First, make sure each borrowing gets at least one inventory item
        foreach ($borrowingIds as $index => $borrowingId) {
            $inventoryId = $inventoryIds[$index % count($inventoryIds)]; // Cycle through inventory items

            $combination = $borrowingId . '-' . $inventoryId;
            if (!in_array($combination, $usedCombinations)) {
                $borrowingDetailData[] = [
                    'borrowing_id' => $borrowingId,
                    'inventory_id' => $inventoryId,
                    'notes' => "Detail record for borrowing #{$borrowingId} and inventory #{$inventoryId}",
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];

                $usedCombinations[] = $combination;
            }
        }

        // Add additional borrowing details if we have more inventory items than borrowings
        $additionalDetailsNeeded = max(0, count($inventoryIds) - count($borrowingIds));

        for ($i = 0; $i < $additionalDetailsNeeded; $i++) {
            $borrowingId = $borrowingIds[array_rand($borrowingIds)];
            $inventoryId = $inventoryIds[array_rand($inventoryIds)];

            $combination = $borrowingId . '-' . $inventoryId;
            if (!in_array($combination, $usedCombinations)) {
                $borrowingDetailData[] = [
                    'borrowing_id' => $borrowingId,
                    'inventory_id' => $inventoryId,
                    'notes' => "Additional detail record for borrowing #{$borrowingId} and inventory #{$inventoryId}",
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];

                $usedCombinations[] = $combination;
            }
        }

        DB::table('borrowing_details')->insert($borrowingDetailData);
    }
}