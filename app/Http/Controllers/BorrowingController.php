<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
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
            ->latest()
            ->paginate(10),
        ]);
    }

    public function create()
    {
        return inertia('Borrowings/Create', [
            'inventories' => Inventory::select('id', 'name', 'stock')->get(),
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
                ->route('Borrowings.index')
                ->with('success', 'Peminjaman berhasil dibuat');

        } catch (ValidationException $e) {
            throw $e;

        } catch (\Exception $e) {
            return back()->withErrors([
                'general' => $e->getMessage(),
            ]);
        }
    }
}

