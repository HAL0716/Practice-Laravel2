<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'index'])
        ->name('register');
    Route::post('register', [RegisterController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'index'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'login']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'logout'])
        ->name('logout');
});
