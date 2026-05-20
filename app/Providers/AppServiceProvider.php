<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use App\Models\User;
use App\Enums\UserRole;
use GMP;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        Gate::define('isAdmin', function (User $user) {
            return $user->role === UserRole::Admin;
        });
        Gate::define('isStaff', function (User $user) {
            return $user->role === UserRole::Staff;
        });
        Gate::define('isCustomer', function (User $user) {
            return in_array($user->role, [UserRole::Admin, UserRole::Staff, UserRole::Customer]);
        });
    }
}
