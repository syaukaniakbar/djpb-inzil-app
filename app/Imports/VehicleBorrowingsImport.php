<?php

namespace App\Imports;

use App\Models\VehicleBorrowing;
use App\Models\User;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class VehicleBorrowingsImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {

            // ===== VALIDASI USER =====
            $user = !empty($row['user_id'])
                ? User::find($row['user_id'])
                : null;

            // ===== VALIDASI VEHICLE =====
            $vehicle = !empty($row['vehicle_id'])
                ? Vehicle::find($row['vehicle_id'])
                : null;

            // Skip jika user atau vehicle tidak ditemukan
            if (!$user || !$vehicle) {
                \Log::warning('Skipping vehicle borrowing import', [
                    'user_id' => $row['user_id'] ?? null,
                    'vehicle_id' => $row['vehicle_id'] ?? null,
                ]);
                continue;
            }

            VehicleBorrowing::create([
                'user_id' => $user->id,
                'vehicle_id' => $vehicle->id,
                'start_at' => $this->parseDate($row['start_at']),
                'end_at' => $this->parseDate($row['end_at']),
                'returned_at' => $this->parseDate($row['returned_at']),
                'purpose' => $row['purpose'] ?? null,
                'destination' => $row['destination'] ?? null,
                'status' => $row['status'] ?? 'pending',
                'admin_note' => $row['admin_note'] ?? null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function parseDate($value)
    {
        if (empty($value)) {
            return null;
        }

        // Jika numeric → Excel serial date
        if (is_numeric($value)) {
            return ExcelDate::excelToDateTimeObject($value);
        }

        // Jika string format seperti: 1/8/2025 12:00:00 PM
        try {
            return Carbon::createFromFormat('n/j/Y g:i:s A', $value);
        } catch (\Exception $e) {
            // Fallback jika format berbeda
            return Carbon::parse($value);
        }
    }
}
