<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Service;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Welcome', [
            'services' => Service::limit(3)->get(), // Featured services
            'projects' => Project::with('client')->latest()->limit(3)->get(),
            'clients' => Client::where('is_visible', true)->get(),
        ]);
    }
}
