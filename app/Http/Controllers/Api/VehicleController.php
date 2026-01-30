<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function getAvailableVehicles(Request $request)
    {
        $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
        ]);

        $startAt = $request->start_at;
        $endAt = $request->end_at;

        $availableVehicles = Vehicle::all()
            ->filter(function ($vehicle) use ($startAt, $endAt) {
                return $vehicle->isAvailableForRange($startAt, $endAt);
            })
            ->values();

        return response()->json([
            'success' => true,
            'vehicles' => $availableVehicles,
            'total_available' => $availableVehicles->count(),
            'filters' => compact('startAt', 'endAt'),
        ]);
    }
}
