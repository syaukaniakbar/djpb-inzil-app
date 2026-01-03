<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;  

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
            'nip' => null,                 
            'birth_date' => null,       
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'position_id' => 1,
            'department_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ],
        [
            'name' => 'Akhmad Syaukani Akbar',
            'email' => 'user01@gmail.com',
            'email_verified_at' => Carbon::now(),
            'nip' => '123456789',
            'birth_date' => '1990-01-01',
            'password' => bcrypt('user123'),
            'role' => 'user',
            'position_id' => 2,
            'department_id' => 2,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ],
        [
            'name' => 'Ahmad Inzil Anwar',
            'email' => 'ahmad.anwar26@kemenkeu.go.id',
            'email_verified_at' => Carbon::now(),
            'nip' => '200107262023021002',
            'birth_date' => '2001-07-26',
            'password' => bcrypt('200107262023021002'),
            'role' => 'user',
            'position_id' => 2,
            'department_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ],
    ]);
    }
}
