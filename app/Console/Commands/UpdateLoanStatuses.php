<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\BookingRoom;
use App\Models\VehicleBorrowing;
use App\Models\Borrowing;

class UpdateLoanStatuses extends Command
{
    protected $signature = 'app:update-loan-statuses';
    protected $description = 'Update status peminjaman kendaraan & ruangan otomatis';

    public function handle()
    {
        $this->updateVehicles();
        $this->updateRooms();
        $this->updateBorrowings();

        $this->info('Loan & Booking statuses updated.');
    }

    private function updateVehicles()
    {
        // approved → ongoing
        VehicleBorrowing::where('status', 'approved')
            ->where('start_at', '<=', now())
            ->update(['status' => 'ongoing']);
    }

    private function updateRooms()
    {
        // approved → ongoing
        BookingRoom::where('status', 'approved')
            ->where('start_at', '<=', now())
            ->update(['status' => 'ongoing']);

        // ongoing → finished jika end_at lewat
        BookingRoom::where('status', 'ongoing')
            ->where('end_at', '<', now())
            ->update(['status' => 'finished']);
    }
    
    private function updateBorrowings()
    {
        // approved → ongoing
        Borrowing::where('status', 'approved')
            ->where('start_at', '<=', now())
            ->update(['status' => 'ongoing']);
            
        // ongoing → finished jika end_at lewat
        Borrowing::where('status', 'ongoing')
            ->where('end_at', '<', now())
            ->update(['status' => 'finished']);
    }
}
