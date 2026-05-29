<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Client;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/data/projects.json'));
        $projects = json_decode($json, true);

        // Fetch primary root account to author the baseline updates safely
        $user = User::first();
        $userId = $user ? $user->id : 1;

        foreach ($projects as $p) {
            $client = Client::where('slug', $p['client_slug'])->first();
            $service = Service::where('slug', $p['service_slug'])->first();

            if ($client && $service) {
                // Ensure duplicate testing names don't generate massive entity sets
                $project = Project::updateOrCreate(
                    [
                        'project_title' => $p['project_title'],
                        'client_id' => $client->id,
                        'service_id' => $service->id,
                    ],
                    [
                        'status' => $p['status'],
                        'is_visible' => ($p['status'] === 'completed'),
                    ]
                );

                // Populate initial layout entry inside the updates tracking line
                $project->updates()->updateOrCreate(
                    ['update_text' => $p['initial_update']],
                    ['user_id' => $userId]
                );
            }
        }
    }
}
