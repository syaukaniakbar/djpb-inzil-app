<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BorrowingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('borrowings')->insert([
            [
                'user_id' => 24,
                'start_at' => Carbon::now()->subDays(5),
                'end_at' => Carbon::now()->addDays(5),
                'returned_at' => null,
                'notes' => 'Borrowed monitor for home office setup',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            [
                'user_id' => 24,
                'start_at' => Carbon::now()->subDays(5),
                'end_at' => Carbon::now()->addDays(5),
                'returned_at' => null,
                'notes' => 'Borrowed laptop for home office setup',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            [
                'user_id' => 24,
                'start_at' => Carbon::now()->subDays(5),
                'end_at' => Carbon::now()->addDays(5),
                'returned_at' => null,
                'notes' => 'Borrowed projector for home office setup',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

            [
                'user_id' => 2,
                'start_at' => Carbon::now()->subDays(7),
                'end_at' => Carbon::now()->addDays(3),
                'returned_at' => null,
                'notes' => 'Borrowed mouse for ergonomic assessment',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'start_at' => Carbon::now()->subDays(3),
                'end_at' => Carbon::now()->addDays(7),
                'returned_at' => null,
                'notes' => 'Borrowed headphones for remote work',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'start_at' => Carbon::now()->subDays(8),
                'end_at' => Carbon::now()->addDays(2),
                'returned_at' => null,
                'notes' => 'Borrowed wireless charging pad',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}