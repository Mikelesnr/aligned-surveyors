<?php

use App\Http\Controllers\ProjectUpdateController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Shared operational line endpoints protected by baseline team clearance
    Route::post('/project-updates', [ProjectUpdateController::class, 'store'])
        ->name('project-updates.store');
});
