<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Return inventories that are NOT borrowed during the requested date range.
     * Matches the same conflict logic used by BorrowingDetailRelationManager.
     *
     * Query params:
     *   start_at          required|date
     *   end_at            required|date|after:start_at
     *   search            optional|string   – filter by name or serial_number
     *   exclude_borrowing optional|integer  – borrowing_id to exclude (for edit page)
     */
    public function getAvailableInventories(Request $request)
    {
        $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'search' => 'nullable|string|max:100',
            'exclude_borrowing' => 'nullable|integer|exists:borrowings,id',
        ]);

        $startAt = Carbon::parse($request->start_at);
        $endAt = Carbon::parse($request->end_at);
        $search = $request->string('search')->trim()->toString();
        $excludeBorrowing = $request->integer('exclude_borrowing') ?: null;

        $inventories = Inventory::query()
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('serial_number', 'like', "%{$search}%");
            }))
            // Exclude inventories that overlap with an active borrowing in this date range
            ->whereDoesntHave('borrowingDetails', function ($q) use ($startAt, $endAt, $excludeBorrowing) {
                $q->whereHas('borrowing', function ($borrowingQuery) use ($startAt, $endAt, $excludeBorrowing) {
                    $borrowingQuery
                        ->whereIn('status', ['pending', 'approved', 'ongoing'])
                        ->where('start_at', '<', $endAt)
                        ->where('end_at', '>', $startAt);

                    if ($excludeBorrowing) {
                        $borrowingQuery->where('id', '!=', $excludeBorrowing);
                    }
                });
            })
            ->orderBy('name')
            ->get(['id', 'name', 'serial_number', 'category'])
            ->map(fn($inv) => [
                'id' => $inv->id,
                'name' => $inv->name,
                'serial_number' => $inv->serial_number,
                'category' => $inv->category,
                'label' => $inv->name . ' (' . $inv->serial_number . ')',
            ]);

        return response()->json([
            'success' => true,
            'inventories' => $inventories,
            'total' => $inventories->count(),
        ]);
    }
}
