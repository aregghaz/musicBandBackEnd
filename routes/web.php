<?php


use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ConcertController;
use App\Http\Controllers\Admin\BandMemberController;
use App\Http\Controllers\Admin\AlbumController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UpcomingTourSectionController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LatestAlbumController;
use App\Http\Controllers\Admin\HomeSectionController;


use Inertia\Inertia;


Route::get('/', [RedirectController::class, 'handleRedirect']);
Route::get('/admin', [RedirectController::class, 'handleRedirect'])->name('admin');

// Add locale prefix and middleware for all admin-related routes
//Route::prefix('{locale}')->middleware(['locale'])->group(function () {

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
    Route::get('/admin/concerts', [ConcertController::class, 'index'])->name('concerts.index');
    Route::get('/admin/concerts/create', [ConcertController::class, 'create'])->name('concerts.create');
    Route::post('/admin/concerts', [ConcertController::class, 'store'])->name('concerts.store');
    Route::get('/admin/concerts/{concert}/edit', [ConcertController::class, 'edit'])->name('concerts.edit');
    Route::patch('/admin/concerts/{concert}', [ConcertController::class, 'update'])->name('concerts.update');
    Route::delete('/admin/concerts/{concert}', [ConcertController::class, 'destroy'])->name('concerts.destroy');
    Route::resource('/admin/band-members', BandMemberController::class);
    Route::resource('/admin/albums', AlbumController::class);
    Route::get('/admin/contacts', [ContactController::class, 'showForm'])->name('contacts.showForm');
    Route::post('/admin/contacts', [ContactController::class, 'storeOrUpdate']);
    Route::get('/admin/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/admin/settings', [SettingController::class, 'storeOrUpdate'])->name('settings.storeOrUpdate');
    Route::resource('admin/sliders', SliderController::class);
    Route::resource('admin/upcoming-tour-sections', UpcomingTourSectionController::class);
    Route::resource('admin/gallery', GalleryController::class);
    Route::get('admin/latest-album', [LatestAlbumController::class, 'index'])->name('latest-album.index');
    Route::post('admin/latest-album', [LatestAlbumController::class, 'storeOrUpdate'])->name('latest-album.storeOrUpdate');
    Route::resource('admin/home-sections', HomeSectionController::class);

});


//});

// Ensure auth routes are included
require __DIR__ . '/auth.php';
