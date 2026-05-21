<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Guest-accessible routes using standard, simplified naming conventions
Route::get('/', HomeController::class)->name('welcome');

Route::prefix('services')->name('services.')->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('index');
    Route::get('/{slug}', [ServiceController::class, 'show'])->name('show');
});

Route::prefix('clients')->name('clients.')->group(function () {
    Route::get('/', [ClientController::class, 'index'])->name('index');
    Route::get('/{slug}', [ClientController::class, 'show'])->name('show');
});

Route::prefix('portfolio-projects')->name('projects.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index');
    Route::get('/{id}', [ProjectController::class, 'show'])->name('show');
});

Route::get('/contact', function () {
    return Inertia::render('Public/Contact');
})->name('contact');

Route::get('/about', [ProjectController::class, 'index'])->name('about');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.submit');
