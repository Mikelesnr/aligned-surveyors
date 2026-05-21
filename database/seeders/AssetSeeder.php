<?php

namespace Database\Seeders;

use App\Models\Asset;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    public function run(): void
    {
        $json = file_get_contents(database_path('seeders/data/assets.json'));
        $assets = json_decode($json, true);

        foreach ($assets as $asset) {
            Asset::updateOrCreate(
                ['name' => $asset['name']],
                ['type' => $asset['type'], 'quantity' => $asset['quantity'], 'description' => $asset['description']]
            );
        }
    }
}
