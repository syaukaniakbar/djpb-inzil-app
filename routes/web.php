<?php

use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\VehicleBorrowingController;
use App\Http\Controllers\BookingRoomController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('main', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/contact-us', function () {
    return Inertia::render('contact-us');
})->name('contact-us');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Borrowing routes
    Route::get('/borrowings', [BorrowingController::class, 'index'])->name('borrowings.index');
    Route::get('/borrowings/create', [BorrowingController::class, 'create'])->name('borrowings.create');
    Route::post('/borrowings/store', [BorrowingController::class, 'store'])->name('borrowings.store');
    Route::get('/borrowings/{borrowing}', [BorrowingController::class, 'show'])->name('borrowings.show');
    Route::get('/borrowings/{borrowing}/edit', [BorrowingController::class, 'edit'])->name('borrowings.edit');
    Route::put('/borrowings/{borrowing}', [BorrowingController::class, 'update'])->name('borrowings.update');
    Route::patch('/borrowings/{borrowing}/cancel', [BorrowingController::class, 'cancel'])->name('borrowings.cancel');

    // Vehicle Borrowing routes
    Route::get('/vehicle-borrowings', [VehicleBorrowingController::class, 'index'])->name('vehicle-borrowings.index');
    Route::get('/vehicle-borrowings/create', [VehicleBorrowingController::class, 'create'])->name('vehicle-borrowings.create');
    Route::post('/vehicle-borrowings/store', [VehicleBorrowingController::class, 'store'])->name('vehicle-borrowings.store');
    Route::get('/vehicle-borrowings/{vehicleBorrowing}', [VehicleBorrowingController::class, 'show'])->name('vehicle-borrowings.show');
    Route::get('/vehicle-borrowings/{vehicleBorrowing}/edit', [VehicleBorrowingController::class, 'edit'])->name('vehicle-borrowings.edit');
    Route::put('/vehicle-borrowings/{vehicleBorrowing}', [VehicleBorrowingController::class, 'update'])->name('vehicle-borrowings.update');
    Route::delete('/vehicle-borrowings/{vehicleBorrowing}', [VehicleBorrowingController::class, 'destroy'])->name('vehicle-borrowings.destroy');

    // Booking Room routes
    Route::get('/booking-rooms', [BookingRoomController::class, 'index'])->name('booking-rooms.index');
    Route::get('/booking-rooms/create', [BookingRoomController::class, 'create'])->name('booking-rooms.create');
    Route::post('/booking-rooms/store', [BookingRoomController::class, 'store'])->name('booking-rooms.store');
    Route::get('/booking-rooms/{bookingRoom}', [BookingRoomController::class, 'show'])->name('booking-rooms.show');
    Route::get('/booking-rooms/{bookingRoom}/edit', [BookingRoomController::class, 'edit'])->name('booking-rooms.edit');
    Route::put('/booking-rooms/{bookingRoom}', [BookingRoomController::class, 'update'])->name('booking-rooms.update');
    Route::delete('/booking-rooms/{bookingRoom}', [BookingRoomController::class, 'destroy'])->name('booking-rooms.destroy');
});

require __DIR__.'/settings.php';
