<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AdminClientController extends Controller
{
    /**
     * Display a listing of client directory parameters.
     */
    public function index(): Response
    {
        Gate::authorize('isAdmin');

        return Inertia::render('Admin/Clients/Index', [
            'clients' => Client::orderBy('name')->get(['id', 'name', 'slug', 'is_visible'])
        ]);
    }

    /**
     * Store a newly created client profile record.
     */
    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:clients,name',
            'is_visible' => 'required|boolean',
        ]);

        Client::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'is_visible' => $validated['is_visible'],
        ]);

        return redirect()->back();
    }

    /**
     * Update an existing client profile mapping attributes.
     */
    public function update(Request $request, Client $client): RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:clients,name,' . $client->id,
            'is_visible' => 'required|boolean',
        ]);

        $client->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'is_visible' => $validated['is_visible'],
        ]);

        return redirect()->back();
    }

    /**
     * Delete a client record entry.
     */
    public function destroy(Client $client): RedirectResponse
    {
        Gate::authorize('isAdmin');

        try {
            $client->delete();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => 'Core Restrict Rule Violation: This client entry is actively linked to ongoing historical projects tracking records.'
            ]);
        }

        return redirect()->back();
    }
}
