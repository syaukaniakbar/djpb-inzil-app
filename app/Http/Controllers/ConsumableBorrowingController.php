<?php

namespace App\Http\Controllers;

use App\Models\ConsumableBorrowing;
use App\Models\ConsumableItem;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsumableBorrowingController extends Controller
{
    /**
     * Display a listing of consumable borrowings.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Admin can see all, regular users only see their own
        $query = ConsumableBorrowing::with(['user', 'consumableItem'])
            ->latest('created_at');

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $borrowings = $query->paginate(10)->withQueryString();

        // Get admin user for WhatsApp contact
        $admin = User::where('role', 'admin')->first();

        return inertia('ConsumableBorrowings/index', [
            'borrowings' => $borrowings,
            'admin' => [
                'phone' => $admin?->phone ?? '6281234567890',
            ],
        ]);
    }

    /**
     * Show the form for creating a new consumable borrowing.
     */
    public function create()
    {
        $consumableItems = ConsumableItem::where('quantity', '>', 0)
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'quantity']);

        return inertia('ConsumableBorrowings/create', [
            'consumableItems' => $consumableItems,
        ]);
    }

    /**
     * Store a newly created consumable borrowing in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'borrowed_at' => 'required|date',
            'consumable_item_id' => 'required|exists:consumable_items,id',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
        ]);

        $consumableItem = ConsumableItem::findOrFail($validated['consumable_item_id']);

        // Check if quantity is available
        if ($validated['quantity'] > $consumableItem->quantity) {
            return back()->withErrors([
                'quantity' => "Jumlah yang diminta melebihi stok yang tersedia. Tersedia: {$consumableItem->quantity}",
            ]);
        }

        ConsumableBorrowing::create([
            'user_id' => Auth::id(),
            'consumable_item_id' => $validated['consumable_item_id'],
            'quantity' => $validated['quantity'],
            'borrowed_at' => $validated['borrowed_at'],
            'notes' => $validated['notes'],
            'status' => 'pending',
        ]);

        return redirect()->route('consumable-borrowings.index')
            ->with('success', 'Peminjaman persediaan berhasil diajukan.');
    }

    /**
     * Display the specified consumable borrowing.
     */
    public function show(ConsumableBorrowing $consumableBorrowing)
    {
        $consumableBorrowing->load(['user', 'consumableItem']);

        return inertia('ConsumableBorrowings/view', [
            'borrowing' => $consumableBorrowing,
        ]);
    }

    /**
     * Show the form for editing the specified consumable borrowing.
     */
    public function edit(ConsumableBorrowing $consumableBorrowing)
    {
        // Only allow editing if status is pending
        if ($consumableBorrowing->status !== 'pending') {
            return redirect()->route('consumable-borrowings.show', $consumableBorrowing)
                ->with('error', 'Hanya peminjaman dengan status pending yang dapat diubah.');
        }

        $consumableItems = ConsumableItem::where('quantity', '>', 0)
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'quantity']);

        return inertia('ConsumableBorrowings/edit', [
            'consumableItems' => $consumableItems,
            'borrowing' => $consumableBorrowing,
        ]);
    }

    /**
     * Update the specified consumable borrowing in storage.
     */
    public function update(Request $request, ConsumableBorrowing $consumableBorrowing)
    {
        // Only allow updating if status is pending
        if ($consumableBorrowing->status !== 'pending') {
            return back()->withErrors([
                'status' => 'Hanya peminjaman dengan status pending yang dapat diubah.',
            ]);
        }

        $validated = $request->validate([
            'borrowed_at' => 'required|date',
            'consumable_item_id' => 'required|exists:consumable_items,id',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string|max:500',
        ]);

        $consumableItem = ConsumableItem::findOrFail($validated['consumable_item_id']);

        // Check if quantity is available (add back old quantity for comparison)
        $availableQuantity = $consumableItem->quantity + $consumableBorrowing->quantity;
        if ($validated['quantity'] > $availableQuantity) {
            return back()->withErrors([
                'quantity' => "Jumlah yang diminta melebihi stok yang tersedia. Tersedia: {$availableQuantity}",
            ]);
        }

        $consumableBorrowing->update($validated);

        return redirect()->route('consumable-borrowings.show', $consumableBorrowing)
            ->with('success', 'Peminjaman persediaan berhasil diperbarui.');
    }

    /**
     * Cancel the specified consumable borrowing.
     */
    public function cancel(ConsumableBorrowing $consumableBorrowing)
    {
        // Only allow canceling if status is pending
        if ($consumableBorrowing->status !== 'pending') {
            return back()->withErrors([
                'status' => 'Hanya peminjaman dengan status pending yang dapat dibatalkan.',
            ]);
        }

        $consumableBorrowing->markAsCanceled();

        return redirect()->route('consumable-borrowings.index')
            ->with('success', 'Peminjaman persediaan berhasil dibatalkan.');
    }

    /**
     * Return the consumable item (mark borrowing as finished).
     */
    public function return(ConsumableBorrowing $consumableBorrowing)
    {
        // Only allow returning if status is ongoing
        if (!in_array($consumableBorrowing->status, ['ongoing', 'pending'])) {
            return back()->withErrors([
                'status' => 'Peminjaman harus dalam status ongoing untuk dikembalikan.',
            ]);
        }

        $consumableBorrowing->markAsFinished();

        return redirect()->route('consumable-borrowings.show', $consumableBorrowing)
            ->with('success', 'Persediaan berhasil dikembalikan.');
    }
}
