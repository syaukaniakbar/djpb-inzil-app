<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConsumableBorrowingRequest;
use App\Models\ConsumableBorrowing;
use App\Models\ConsumableItem;
use App\Models\User;
use App\Services\ConsumableBorrowingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsumableBorrowingController extends Controller
{
    protected $service;

    public function __construct(ConsumableBorrowingService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of consumable borrowings.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Admin can see all, regular users only see their own
        $query = ConsumableBorrowing::with(['user', 'consumableItem'])
            ->search(request(['search', 'status', 'borrowed_at_from', 'borrowed_at_to']))
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
            'filters' => request(['search', 'status', 'borrowed_at_from', 'borrowed_at_to']),
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
    public function store(ConsumableBorrowingRequest $request)
    {
        try {
            $this->service->createBorrowing($request->validated());

            return redirect()->route('consumable-borrowings.index')
                ->with('success', 'Peminjaman persediaan berhasil diajukan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
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
        if (!$consumableBorrowing->isPending()) {
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
    public function update(ConsumableBorrowingRequest $request, ConsumableBorrowing $consumableBorrowing)
    {
        try {
            $this->service->updateBorrowing($consumableBorrowing, $request->validated());

            return redirect()->route('consumable-borrowings.show', $consumableBorrowing)
                ->with('success', 'Peminjaman persediaan berhasil diperbarui.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Cancel the specified consumable borrowing.
     */
    public function cancel(ConsumableBorrowing $consumableBorrowing)
    {
        try {
            $this->service->cancelBorrowing($consumableBorrowing);

            return redirect()->route('consumable-borrowings.index')
                ->with('success', 'Peminjaman persediaan berhasil dibatalkan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Return the consumable item (mark borrowing as finished).
     */
    public function return(ConsumableBorrowing $consumableBorrowing)
    {
        try {
            $this->service->finishBorrowing($consumableBorrowing);

            return redirect()->route('consumable-borrowings.show', $consumableBorrowing)
                ->with('success', 'Persediaan berhasil dikembalikan.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
