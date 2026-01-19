<?php

use App\Http\Controllers\BorrowingController;
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
});

require __DIR__.'/settings.php';
