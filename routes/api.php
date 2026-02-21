<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RoomController as ApiRoomController;
use App\Http\Controllers\Api\VehicleController as ApiVehicleController;
use App\Http\Controllers\Api\InventoryController as ApiInventoryController;

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