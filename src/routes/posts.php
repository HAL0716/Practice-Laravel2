<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('posts', [PostController::class, 'index'])
        ->name('posts');
    Route::post('posts', [PostController::class, 'store'])
        ->name('posts.store');
    Route::patch('posts/{post}', [PostController::class, 'update'])
        ->name('posts.update');
    Route::delete('posts/{post}', [PostController::class, 'destroy'])
        ->name('posts.destroy');
});
