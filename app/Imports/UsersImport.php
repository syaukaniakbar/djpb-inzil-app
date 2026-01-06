<?php

namespace App\Imports;

use App\Models\User;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new User([
            'name'              => $row['nama'],
            'email'             => $row['email'],
            'email_verified_at' => now(),
            'birth_date' => Carbon::createFromFormat('d/m/Y', $row['tanggal_lahir']),
            'nip'               => $row['nip'],
            'password'          => bcrypt($row['nip']),
            'role'              => 'user',
            'position_id'       => $row['jabatan'],
            'department_id'     => $row['bagianbidang'],
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);
    }
}
