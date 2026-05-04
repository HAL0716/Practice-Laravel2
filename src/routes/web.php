<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route(Auth::check() ? 'profile' : 'login');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])
        ->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';

require __DIR__.'/posts.php';
