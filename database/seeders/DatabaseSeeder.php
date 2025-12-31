<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Akhmad Syaukani Akbar',
                'email' => 'admin01@gmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => bcrypt('admin123456'),
                'role' => 'admin',
                'position_id' => 1,
                'department_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],

             [
                'name' => 'Akhmad Syaukani Akbar',
                'email' => 'admin01@gmail.com',
                'email_verified_at' => Carbon::now(),
                'nip' => '123456789',
                'password' => bcrypt('admin123456'),
                'role' => 'admin',
                'position_id' => 1,
                'department_id' => 1,
                'birth_date' => '1990-01-01',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
