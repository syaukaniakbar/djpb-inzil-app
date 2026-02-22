<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Services\BorrowingService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\BorrowingRequest;
use App\Models\User;

class BorrowingController extends Controller
{
    protected BorrowingService $borrowingService;

    public function __construct(BorrowingService $borrowingService)
    {
        $this->borrowingService = $borrowingService;
    }

    /**
     * List the current user's borrowings.
     */
    public function index()
    {
        $admin = User::where('role', 'admin')
            ->select('id', 'name', 'phone')
            ->first();

        return inertia('Borrowings/index', [
            'borrowings' => Borrowing::with([
                'user:id,name',
                'borrowingDetails:id,borrowing_id,inventory_id,notes',
                'borrowingDetails.inventory:id,name',
            ])
                ->select([
                    'id',
                    'user_id',
                    'start_at',
                    'end_at',
                    'returned_at',
                    'admin_note',
                    'status',
                    'created_at',
                ])
                ->where('user_id', Auth::id())
                ->search(request(['search', 'status', 'start_at_from', 'start_at_to']))
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'admin' => $admin,
            'filters' => request(['search', 'status', 'start_at_from', 'start_at_to']),
        ]);
    }

    /**
     * Show the create form.
     * Inventories are loaded via the live-search API (/api/inventories/available-inventories).
     */
    public function create()
    {
        return inertia('Borrowings/create');
    }

    /**
     * Store a new borrowing.
     */
    public function store(BorrowingRequest $request)
    {
        try {
            $this->borrowingService->createBorrowing($request->validated());

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil dibuat');

        } catch (\Throwable $e) {
            return back()
                ->withInput()
                ->withErrors(['general' => $e->getMessage()]);
        }
    }

    /**
     * Show a single borrowing.
     */
    public function show(Borrowing $borrowing)
    {
        if ($borrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to view this borrowing');
        }

        $borrowingData = Borrowing::select([
            'id',
            'user_id',
            'start_at',
            'end_at',
            'returned_at',
            'admin_note',
            'status',
            'notes',
            'created_at',
        ])
            ->with([
                'user:id,name',
                'borrowingDetails:id,borrowing_id,inventory_id,notes',
                'borrowingDetails.inventory:id,name',
            ])
            ->findOrFail($borrowing->id);

        return inertia('Borrowings/view', [
            'borrowing' => $borrowingData,
        ]);
    }

    /**
     * Show the edit form.
     * Inventories are loaded via the live-search API with ?exclude_borrowing={id}.
     */
    public function edit(Borrowing $borrowing)
    {
        if ($borrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to edit this borrowing');
        }

        $borrowingData = Borrowing::select([
            'id',
            'user_id',
            'start_at',
            'end_at',
            'returned_at',
            'admin_note',
            'status',
            'notes',
            'created_at',
        ])
            ->with([
                'user:id,name',
                'borrowingDetails:id,borrowing_id,inventory_id,notes',
                'borrowingDetails.inventory:id,name',
            ])
            ->findOrFail($borrowing->id);

        return inertia('Borrowings/edit', [
            'borrowing' => $borrowingData,
        ]);
    }

    /**
     * Update an existing borrowing.
     */
    public function update(BorrowingRequest $request, Borrowing $borrowing)
    {
        try {
            $this->borrowingService->updateBorrowing($borrowing, $request->validated());

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil diperbarui');

        } catch (\Throwable $e) {
            return back()->withErrors(['general' => $e->getMessage()]);
        }
    }

    /**
     * Cancel a borrowing (pending → canceled).
     */
    public function cancel(Borrowing $borrowing)
    {
        if ($borrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to cancel this borrowing');
        }

        try {
            $this->borrowingService->cancelBorrowing($borrowing);

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil dibatalkan');

        } catch (\Throwable $e) {
            return back()->withErrors(['general' => $e->getMessage()]);
        }
    }

    /**
     * Mark a borrowing as returned.
     */
    public function return(Borrowing $borrowing)
    {
        if ($borrowing->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to return this borrowing');
        }

        try {
            $this->borrowingService->returnBorrowing($borrowing);

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil dikembalikan');

        } catch (\Throwable $e) {
            return back()->withErrors(['general' => $e->getMessage()]);
        }
    }
}
