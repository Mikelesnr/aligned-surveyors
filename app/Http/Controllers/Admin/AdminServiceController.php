<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AdminServiceController extends Controller
{
    /**
     * Display the index catalog of all fields of practice.
     */
    public function index(): Response
    {
        Gate::authorize('isAdmin');

        return Inertia::render('Admin/Services/Index', [
            'services' => Service::orderBy('title')->get(['id', 'title', 'slug', 'description'])
        ]);
    }

    /**
     * Store a newly created service capability.
     */
    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:services,title',
            'description' => 'required|string',
        ]);

        Service::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'description' => $validated['description'],
        ]);

        return redirect()->back();
    }

    /**
     * Update an existing service capability.
     */
    public function update(Request $request, Service $service): RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:services,title,' . $service->id,
            'description' => 'required|string',
        ]);

        $service->update([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'description' => $validated['description'],
        ]);

        return redirect()->back();
    }

    /**
     * Remove a service capability from the catalog registry.
     */
    public function destroy(Service $service): RedirectResponse
    {
        Gate::authorize('isAdmin');

        try {
            // Triggers a database level RESTRICT exception if projects are actively linked
            $service->delete();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => 'Core Restrict Rule Violation: This service field is actively tied to live project records and cannot be safely unlinked.'
            ]);
        }

        return redirect()->back();
    }
}
