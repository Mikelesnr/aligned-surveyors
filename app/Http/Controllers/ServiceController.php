<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Services/Index', [
            'services' => Service::select('id', 'title', 'slug', 'description')->get(),
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)
            ->with(['projects' => function ($query) {
                $query->whereHas('client', function ($q) {
                    $q->where('is_visible', true);
                })->with('client:id,name,slug')->select('id', 'service_id', 'client_id', 'project_title', 'status');
            }])
            ->firstOrFail();

        return Inertia::render('Public/Services/Show', [
            'service' => $service,
        ]);
    }
}
