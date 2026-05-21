<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::whereHas('client', function ($query) {
            $query->where('is_visible', true);
        })
            ->with(['client:id,name,slug', 'service:id,title,slug'])
            ->select('id', 'client_id', 'service_id', 'project_title', 'status')
            ->latest()
            ->get();

        return Inertia::render('Public/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function show(string $id): Response
    {
        $project = Project::whereHas('client', function ($query) {
            $query->where('is_visible', true);
        })
            ->with([
                'client:id,name,slug',
                'service:id,title,slug',
                'updates' => function ($query) {
                    $query->with('user:id,name')->latest();
                }
            ])
            ->findOrFail($id);

        return Inertia::render('Public/Projects/Show', [
            'project' => $project,
        ]);
    }
}
