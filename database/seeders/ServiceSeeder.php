<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/data/services.json'));
        $services = json_decode($json, true);

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                ['title' => $service['title'], 'description' => $service['description']]
            );
        }
    }
}
