<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Models\Inventory;
use App\Services\BorrowingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;



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
                'user',
                'borrowingDetails.inventory',
            ])
            ->where('user_id', Auth::id())  // Hanya ambil borrowing milik user yang login
            ->latest()
            ->paginate(10),
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
    public function store(Request $request)
    {
        try {
            $this->borrowingService->createBorrowing(
                $request->all()
            );
            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil dibuat');

        } catch (ValidationException $e) {
            throw $e;

        } catch (\Exception $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Show borrowing edit form
     */
    public function edit(Borrowing $borrowing)
    {
        return inertia('Borrowings/edit', [
            'borrowing' => $borrowing->load([
                'borrowingDetails.inventory',
                'user'
            ]),
            'inventories' => Inventory::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update borrowing (INERTIA RESPONSE)
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        try {
            $updatedBorrowing = $this->borrowingService->updateBorrowing(
                $borrowing,
                $request->all()
            );

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil diperbarui');

        } catch (ValidationException $e) {
            throw $e;

        } catch (\Exception $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Delete a borrowing and its related details
     */
    public function destroy(Borrowing $borrowing)
    {
        try {
            $this->borrowingService->deleteBorrowing($borrowing);

            return redirect()
                ->route('borrowings.index')
                ->with('success', 'Peminjaman berhasil dihapus');

        } catch (\Exception $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }
}

