<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoomController as ApiRoomController;
use App\Http\Controllers\Api\VehicleController as ApiVehicleController;
use App\Http\Controllers\Api\InventoryController as ApiInventoryController;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Room API routes
Route::prefix('rooms')->group(function () {
    Route::get('/available-rooms', [ApiRoomController::class, 'getAvailableRooms']);
});

// Vehicle API routes
Route::prefix('vehicles')->group(function () {
    Route::get('/available-vehicles', [ApiVehicleController::class, 'getAvailableVehicles']);
});

// Inventory API routes
Route::prefix('inventories')->group(function () {
    Route::get('/available-inventories', [ApiInventoryController::class, 'getAvailableInventories']);
});

Route::get('/cron/update-loan-statuses', function () {
    if (request('key') !== env('CRON_KEY')) {
        abort(403);
    }

    Artisan::call('app:update-loan-statuses');
    return response()->json(['status' => 'OK']);
});