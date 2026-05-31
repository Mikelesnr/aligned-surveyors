<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Service;
use App\Models\Client;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'users' => User::where('id', '!=', Auth::id())
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'role', 'is_active', 'created_at']),

            'services' => Service::orderBy('title')->get(['id', 'title', 'slug']),
            'clients' => Client::orderBy('name')->get(['id', 'name', 'slug', 'is_visible']),
            'projects' => Project::with(['service:id,title', 'client:id,name'])->latest()->get(),

            'projectUpdates' => ProjectUpdate::with(['project:id,project_title', 'user:id,name'])
                ->latest()
                ->get(),
        ]);
    }
}
