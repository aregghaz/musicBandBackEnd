<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\BlogController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Redirect for /admin (without locale) to the default locale (en)
Route::get('/admin', function () {
    // Check if user is authenticated
    if (auth()->check()) {
        // Redirect to the default locale (en) if no locale is set
        return redirect()->route('admin.dashboard', ['locale' => 'en']);
    }
    // If not authenticated, redirect to login
    return redirect()->route('login');
})->name('admin');

// Other routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Add locale prefix and middleware for all admin-related routes
Route::prefix('{locale}')->middleware(['locale'])->group(function () {

    // ✅ Protect Dashboard & Profile routes with auth middleware
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/admin/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // ✅ Admin Routes (Protected)
    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/admin/blogs', [BlogController::class, 'index'])->name('blogs.index');
        Route::get('/admin/blogs/create', [BlogController::class, 'create'])->name('blogs.create');
        Route::post('/admin/blogs', [BlogController::class, 'store'])->name('blogs.store');
        Route::get('/admin/blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
        Route::patch('/admin/blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');
        Route::delete('/admin/blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');
    });
});

// Ensure auth routes are included
require __DIR__ . '/auth.php';
