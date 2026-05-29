<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Service;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AdminProjectController extends Controller
{
    /**
     * Display a listing of historical contract portfolios alongside dropdown dependencies.
     */
    public function index(): Response
    {
        Gate::authorize('isAdmin');

        return Inertia::render('Admin/Projects/Index', [
            // Eagerly pull relations for table presentation layouts
            'projects' => Project::with(['service:id,title', 'client:id,name'])->latest()->get(),
            // Seed dropdown arrays for quick creation inputs
            'services' => Service::orderBy('title')->get(['id', 'title']),
            'clients' => Client::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly initialized active or completed project context.
     */
    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validated = $request->validate([
            'service_id' => 'required|uuid|exists:services,id',
            'client_id' => 'required|uuid|exists:clients,id',
            'project_title' => 'required|string|max:255',
            'status' => 'required|in:active,completed',
            'is_visible' => 'boolean',
        ]);

        Project::create($validated);

        return redirect()->back();
    }

    /**
     * Update operational tracking attributes or state values of a project.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        Gate::authorize('isAdmin');

        $validated = $request->validate([
            'service_id' => 'required|uuid|exists:services,id',
            'client_id' => 'required|uuid|exists:clients,id',
            'project_title' => 'required|string|max:255',
            'status' => 'required|in:active,completed',
            'is_visible' => 'boolean',
        ]);

        $project->update($validated);

        return redirect()->back();
    }

    /**
     * Remove a project parameter map from the active directory tracking repository.
     */
    public function destroy(Project $project): RedirectResponse
    {
        Gate::authorize('isAdmin');

        // This structural cascade handles log cleanups according to design specs
        $project->delete();

        return redirect()->back();
    }
}
