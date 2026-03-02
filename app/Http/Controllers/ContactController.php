<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        // Get the first admin user's phone number
        $adminPhone = User::where('role', 'admin')
            ->whereNotNull('phone')
            ->value('phone');

        return Inertia::render('contact-us', [
            'adminPhone' => $adminPhone,
        ]);
    }
}
