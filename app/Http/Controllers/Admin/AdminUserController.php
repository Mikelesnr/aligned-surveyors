<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    /**
     * Display a listing of all team members.
     */
    public function index(): Response
    {
        // Enforce the registered 'isAdmin' gate from AppServiceProvider
        Gate::authorize('isAdmin');

        return Inertia::render('Admin/Users/Index', [
            'users' => User::orderBy('name')->get(['id', 'name', 'email', 'role', 'created_at'])
        ]);
    }

    /**
     * Store a newly created user account.
     */
    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => ['required', new Enum(UserRole::class)],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return redirect()->back();
    }

    /**
     * Update an existing user's name, email, or role.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        Gate::authorize('isAdmin');

        // Fail-safe: Block any attempt by an administrator to process updates on themselves here
        if ($user->id === Auth::id()) {
            return redirect()->back()->withErrors([
                'role' => 'Security Exception: You cannot modify your own administrative access group from this pane.'
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => ['required', new Enum(UserRole::class)],
            'password' => 'nullable|string|min:8' // Password optional on update
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
        ];

        // Re-hash and append the password only if it was filled out in the edit form
        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->back();
    }

    /**
     * Delete a user account from the system.
     */
    public function destroy(User $user): RedirectResponse
    {
        Gate::authorize('isAdmin');

        // Safeguard to prevent an logged-in admin from deleting their own active account session
        if (Auth::id() === $user->id) {
            return redirect()->back()->withErrors(['error' => 'Self-deletion is prohibited. If you need to restrict this account, have another administrator modify your role matrix.']);
        }

        $user->delete();

        return redirect()->back();
    }
}
