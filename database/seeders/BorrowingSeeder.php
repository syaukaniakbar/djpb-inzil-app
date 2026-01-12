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
        // Get available user IDs to ensure we have valid foreign keys
        $userIds = DB::table('users')->pluck('id')->toArray();
        
        // If no users exist, create a default user
        if (empty($userIds)) {
            DB::table('users')->insert([
                'name' => 'Default User',
                'email' => 'user@example.com',
                'email_verified_at' => Carbon::now(),
                'nip' => '123456789',
                'birth_date' => Carbon::now()->subYears(30),
                'password' => bcrypt('password'),
                'role' => 'user',
                'position_id' => null,
                'department_id' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            $userIds = [DB::getPdo()->lastInsertId()];
        }

        DB::table('borrowings')->insert([
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(10),
                'end_at' => Carbon::now()->subDays(3),
                'returned_at' => Carbon::now()->subDays(2),
                'notes' => 'Borrowed laptop for client presentation',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(5),
                'end_at' => Carbon::now()->addDays(5),
                'returned_at' => null,
                'notes' => 'Borrowed monitor for home office setup',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(15),
                'end_at' => Carbon::now()->subDays(8),
                'returned_at' => Carbon::now()->subDays(9),
                'notes' => 'Borrowed ergonomic chair due to back issues',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(20),
                'end_at' => Carbon::now()->subDays(10),
                'returned_at' => Carbon::now()->subDays(12),
                'notes' => 'Borrowed wireless keyboard for compatibility testing',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(7),
                'end_at' => Carbon::now()->addDays(3),
                'returned_at' => null,
                'notes' => 'Borrowed mouse for ergonomic assessment',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(25),
                'end_at' => Carbon::now()->subDays(15),
                'returned_at' => Carbon::now()->subDays(16),
                'notes' => 'Borrowed standing desk converter for trial',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(3),
                'end_at' => Carbon::now()->addDays(7),
                'returned_at' => null,
                'notes' => 'Borrowed headphones for remote work',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(12),
                'end_at' => Carbon::now()->subDays(2),
                'returned_at' => Carbon::now()->subDays(3),
                'notes' => 'Borrowed document scanner for project',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(8),
                'end_at' => Carbon::now()->addDays(2),
                'returned_at' => null,
                'notes' => 'Borrowed wireless charging pad',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $userIds[0],
                'start_at' => Carbon::now()->subDays(30),
                'end_at' => Carbon::now()->subDays(20),
                'returned_at' => Carbon::now()->subDays(22),
                'notes' => 'Borrowed laptop for conference presentation',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}