<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/data/clients.json'));
        $clients = json_decode($json, true);

        foreach ($clients as $client) {
            Client::updateOrCreate(
                ['slug' => $client['slug']],
                ['name' => $client['name'], 'is_visible' => $client['is_visible']]
            );
        }
    }
}
