<?php

use App\Http\Controllers\Admin\AdminClientController;
use Illuminate\Support\Facades\Route;

// Flat routing map for isolated client directory CRUD management
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/clients', [AdminClientController::class, 'index'])->name('clients.index');
    Route::post('/clients', [AdminClientController::class, 'store'])->name('clients.store');
    Route::put('/clients/{client}', [AdminClientController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{client}', [AdminClientController::class, 'destroy'])->name('clients.destroy');
});
