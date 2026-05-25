<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Service;
use App\Models\Client;
use App\Models\Project;
use App\Models\ProjectUpdate;
use Inertia\Inertia;

// 1. Load Split Customer-Facing Routes File
require __DIR__ . '/public.php';

// 2. Flat Admin Domain Modules Routing
require __DIR__ . '/admin_users.php';
require __DIR__ . '/admin_services.php';
require __DIR__ . '/admin_clients.php';
require __DIR__ . '/admin_projects.php';

// 3. Internal Protected Systems (To be fully integrated once frontend pages work)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        // Clean Guard: Filter out the logged-in user from the administrative view list
        'users' => User::where('id', '!=', auth()->id())
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'role', 'is_active', 'created_at']),

        'services' => Service::orderBy('title')->get(['id', 'title', 'slug']),
        'clients' => Client::orderBy('name')->get(['id', 'name', 'slug', 'is_visible']),
        'projects' => Project::with(['service:id,title', 'client:id,name'])->latest()->get(),

        // FILLS THE MISSING LINK: Fetches project updates with the project and author names attached
        'projectUpdates' => ProjectUpdate::with(['project:id,project_title', 'user:id,name'])
            ->latest()
            ->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 4. Load Authentication Routes (Login, Registration, Password Reset, etc.)
require __DIR__ . '/auth.php';

// 5. Import the clean staff operations routing block
require __DIR__ . '/staff.php';

// 6. Import the standalone workspace communications real-time engine
require __DIR__ . '/chat.php';
// require __DIR__ . '/channels.php';
