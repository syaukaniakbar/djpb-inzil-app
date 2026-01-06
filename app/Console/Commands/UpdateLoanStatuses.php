<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\VehicleBorrowing;
use Carbon\Carbon;

class UpdateLoanStatuses extends Command
{
    protected $signature = 'app:update-loan-statuses';
    protected $description = 'Update status peminjaman kendaraan otomatis berdasarkan jadwal';

    public function handle()
    {
        $now = Carbon::now();
        $this->updateVehicleLoans($now);
        $this->info('Vehicle loan statuses updated.');
    }

    private function updateVehicleLoans(Carbon $now)
    {
        // Update approved loans to ongoing when start time has passed
        VehicleBorrowing::where('status', 'approved')
            ->whereDate('start_at', '<=', $now->toDateString())
            ->whereTime('start_at', '<=', $now->toTimeString())
            ->update([
                'status' => 'ongoing',
            ]);

        // Update ongoing loans to overdue when end time has passed and not yet returned
        VehicleBorrowing::where('status', 'ongoing')
            ->whereDate('end_at', '<', $now->toDateString())
            ->whereNull('returned_at')
            ->update([
                'status' => 'overdue',
            ]);

        // Alternative check for overdue: same day but time has passed
        VehicleBorrowing::where('status', 'ongoing')
            ->whereDate('end_at', '=', $now->toDateString())
            ->whereTime('end_at', '<', $now->toTimeString())
            ->whereNull('returned_at')
            ->update([
                'status' => 'overdue',
            ]);
    }
}
