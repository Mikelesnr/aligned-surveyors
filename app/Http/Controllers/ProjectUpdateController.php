<?php

namespace App\Http\Controllers;

use App\Models\ProjectUpdate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class ProjectUpdateController extends Controller
{
    /**
     * Store a new geological or operational update for a project.
     */
    public function store(Request $request): RedirectResponse
    {
        // Absolute check: User must be either an Admin or Staff member
        Gate::authorize('isPersonnel');

        $validated = $request->validate([
            'project_id' => 'required|uuid|exists:projects,id',
            'update_text' => 'required|string|min:5',
        ]);

        ProjectUpdate::create([
            'project_id' => $validated['project_id'],
            'user_id' => Auth::id(),
            'update_text' => $validated['update_text'], // Matches model fillable baseline configuration
        ]);

        return redirect()->back();
    }
}
