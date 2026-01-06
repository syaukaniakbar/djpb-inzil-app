<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\UsersImport;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert the main admin user
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin01@gmail.com',
            'email_verified_at' => Carbon::now(),
            'nip' => null,
            'birth_date' => null,
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'position_id' => null,
            'department_id' => null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        // Import users from Excel file
        Excel::import(new UsersImport, database_path('seeders/data/users.xlsx'));
    }
}