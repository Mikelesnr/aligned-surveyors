<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Clients/Index', [
            'clients' => Client::where('is_visible', true)->select('id', 'name', 'slug')->get(),
        ]);
    }

    public function show(string $slug): Response
    {
        $client = Client::where('slug', $slug)
            ->where('is_visible', true)
            ->with(['projects.service:id,title,slug'])
            ->firstOrFail();

        return Inertia::render('Public/Clients/Show', [
            'client' => $client,
        ]);
    }
}
