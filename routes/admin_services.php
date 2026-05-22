<?php

use App\Http\Controllers\Admin\AdminServiceController;
use Illuminate\Support\Facades\Route;

// Flat routing map for isolated service capabilities CRUD management
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/services', [AdminServiceController::class, 'index'])->name('services.index');
    Route::post('/services', [AdminServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [AdminServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [AdminServiceController::class, 'destroy'])->name('services.destroy');
});
