<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Models\Inventory;
use App\Services\BorrowingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\BorrowingRequest;



class BorrowingController extends Controller
{
    protected BorrowingService $borrowingService;

    public function __construct(BorrowingService $borrowingService)
    {
        $this->borrowingService = $borrowingService;
    }

    /**
     * Show borrowing form
     */
    public function index()
    {
        return inertia('Borrowings/index', [
            'borrowings' => Borrowing::with([
                'user:id',
                'borrowingDetails:id,borrowing_id,inventory_id,quantity,notes',
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
                ->latest()
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function create()
    {
        return inertia('Borrowings/create', [
            'inventories' => Inventory::select('id', 'name')->get(),
        ]);
    }


    /**
     * Store borrowing (INERTIA RESPONSE)
     */
    public function store(BorrowingRequest $request)
    {
        try {
            $this->borrowingService->createBorrowing(
                $request->validated()
            );

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil dibuat');

        } catch (\Throwable $e) {
            return back()
                ->withInput()
                ->withErrors([
                    'general' => $e->getMessage(),
                ]);
        }
    }


    /**
     * Show borrowing details
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
                'borrowingDetails:id,borrowing_id,inventory_id,quantity,notes',
                'borrowingDetails.inventory:id,name',
            ])
            ->findOrFail($borrowing->id);

        return inertia('Borrowings/view', [
            'borrowing' => $borrowingData,
        ]);
    }

    /**
     * Show borrowing edit form
     */
    public function edit(Borrowing $borrowing)
    {
        // Ensure the user can only edit their own borrowings
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
                'borrowingDetails:id,borrowing_id,inventory_id,quantity,notes',
                'borrowingDetails.inventory:id,name',
            ])
            ->findOrFail($borrowing->id);

        return inertia('Borrowings/edit', [
            'borrowing' => $borrowingData,
            'inventories' => Inventory::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update borrowing (INERTIA RESPONSE)
     */
    public function update(BorrowingRequest $request, Borrowing $borrowing)
    {
        try {
            $updatedBorrowing = $this->borrowingService->updateBorrowing(
                $borrowing,
                $request->validated()
            );
            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil diperbarui');

        } catch (\Throwable $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Cancel a borrowing by updating its status to canceled
     */
    public function cancel(Borrowing $borrowing)
    {
        try {
            $this->borrowingService->cancelBorrowing($borrowing);

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil dibatalkan');

        } catch (\Throwable $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }

}

