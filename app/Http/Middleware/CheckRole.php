<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // If user is authenticated and role doesn't match, redirect
        if ($request->user() && $request->user()->role !== $role) {
            // If admin tries to access user routes, redirect to admin panel
            if ($request->user()->role === 'admin') {
                return redirect()->route('filament.admin.auth.login');
            }

            // For other roles, redirect to home
            return redirect()->route('home')
                ->with('error', 'You do not have permission to access this page.');
        }

        return $next($request);
    }
}
