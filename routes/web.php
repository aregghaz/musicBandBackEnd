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
use App\Http\Controllers\Admin\UpcomingTourSectionController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LatestAlbumController;
use App\Http\Controllers\Admin\HomeSectionController;
use App\Http\Controllers\Admin\AboutUsNewsController;
use App\Http\Controllers\Admin\ReviewController;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [RedirectController::class, 'handleRedirect']);
Route::get('/admin', [RedirectController::class, 'handleRedirect'])->name('admin');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/blogs', [BlogController::class, 'index'])->name('blogs.index');
    Route::get('/admin/blogs/create', [BlogController::class, 'create'])->name('blogs.create');
    Route::post('/admin/blogs', [BlogController::class, 'store'])->name('blogs.store');
    Route::get('/admin/blogs/{blog}/edit', [BlogController::class, 'edit'])->name('blogs.edit');
    Route::patch('/admin/blogs/{blog}', [BlogController::class, 'update'])->name('blogs.update');
    Route::delete('/admin/blogs/{blog}', [BlogController::class, 'destroy'])->name('blogs.destroy');
    Route::resource('/admin/concerts', ConcertController::class);
    Route::resource('/admin/band-members', BandMemberController::class);
    Route::resource('/admin/albums', AlbumController::class);
    Route::get('/admin/contacts', [ContactController::class, 'showForm'])->name('contacts.showForm');
    Route::post('/admin/contacts', [ContactController::class, 'storeOrUpdate']);
    Route::get('/admin/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/admin/settings', [SettingController::class, 'storeOrUpdate'])->name('settings.storeOrUpdate');
    Route::resource('admin/sliders', SliderController::class);
    Route::resource('admin/upcoming-tour-sections', UpcomingTourSectionController::class);
    Route::resource('admin/gallery', GalleryController::class);
    Route::delete('admin/gallery/image/{gallery}', [GalleryController::class, 'destroyImage'])->name('gallery.image.destroy');
    Route::get('admin/latest-album', [LatestAlbumController::class, 'index'])->name('latest-album.index');
    Route::post('admin/latest-album', [LatestAlbumController::class, 'storeOrUpdate'])->name('latest-album.storeOrUpdate');
    Route::resource('admin/home-sections', HomeSectionController::class);
    Route::resource('admin/about-us-news', AboutUsNewsController::class);
    Route::resource('admin/reviews', ReviewController::class);
});

Route::bind('gallery', function ($value) {
    return GalleryCategory::findOrFail($value);
});

Route::bind('gallery', function ($value, $route) {
    if ($route->getName() === 'gallery.image.destroy') {
        return Gallery::findOrFail($value);
    }
    return GalleryCategory::findOrFail($value);
});

require __DIR__ . '/auth.php';
