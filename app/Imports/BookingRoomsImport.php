<?php

namespace App\Imports;

use App\Models\BookingRoom;
use App\Models\User;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class BookingRoomsImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {

            // ===== VALIDASI USER =====
            $user = !empty($row['user_id'])
                ? User::find($row['user_id'])
                : null;

            // ===== VALIDASI ROOM =====
            $room = !empty($row['room_id'])
                ? Room::find($row['room_id'])
                : null;

            // Skip jika user atau room tidak ditemukan
            if (!$user || !$room) {
                \Log::warning('Skipping room booking import', [
                    'user_id' => $row['user_id'] ?? null,
                    'room_id' => $row['room_id'] ?? null,
                ]);
                continue;
            }

            BookingRoom::create([
                'user_id' => $user->id,
                'room_id' => $room->id,
                'start_at' => $this->parseDate($row['start_at']),
                'end_at' => $this->parseDate($row['end_at']),
                'event_mode' => $row['event_mode'] ?? null,
                'event_name' => $row['event_name'] ?? null,
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
