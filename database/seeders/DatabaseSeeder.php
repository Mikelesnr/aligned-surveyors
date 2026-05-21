<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
// use Exception;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Provision Admin Core Security Account First
        $email = config('services.admin.email', 'admin@alignedsurveyors.com');
        $password = config('services.admin.password', 'SecretPassword123');

        $admin = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => config('services.admin.name', 'System Administrator'),
                'password' => Hash::make($password),
                'role' => UserRole::Admin,
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 2. Call the Isolated Module Seeders sequentially
        $this->call([
            ServiceSeeder::class,
            ClientSeeder::class,
            AssetSeeder::class,
            ProjectSeeder::class,
        ]);
    }
}
