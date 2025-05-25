<?php

use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogApiController;
use App\Http\Controllers\Api\AboutUsNewsApiController;
use App\Http\Controllers\Api\ConcertApiController;
use App\Http\Controllers\Api\BandMemberApiController;
use App\Http\Controllers\Api\AlbumApiController;
use App\Http\Controllers\Api\ContactApiController;
use App\Http\Controllers\Api\SettingsApiController;
use App\Http\Controllers\Api\GalleryApiController;
use App\Http\Controllers\Api\UpcomingTourSectionApiController;
use App\Http\Controllers\Api\LatestAlbumApiController;
use App\Http\Controllers\Api\HomeApiController;
use App\Http\Controllers\Api\HomeSectionApiController;
use App\Http\Controllers\Api\ReviewApiController;

Route::get('/blogs', [BlogApiController::class, 'index']);
Route::get('/blogs/{id}', [BlogApiController::class, 'show']);
Route::get('/about-us-news', [AboutUsNewsApiController::class, 'index']);
Route::get('/about-us-news/{id}', [AboutUsNewsApiController::class, 'show']);
Route::get('/concerts/type/{type}', [ConcertApiController::class, 'getConcertsByType']);
Route::get('/concerts', [ConcertApiController::class, 'index']);
Route::get('/band-members', [BandMemberApiController::class, 'index']);
Route::get('/albums', [AlbumApiController::class, 'getAlbums']);
Route::get('/albums/{id}', [AlbumApiController::class, 'getAlbum']);
Route::get('/contacts', [ContactApiController::class, 'index']);
Route::get('/settings', [SettingsApiController::class, 'getAllSettings']);
Route::get('/tour-presale-dates', [UpcomingTourSectionApiController::class, 'index']);
Route::get('/tour-presale-summary', [UpcomingTourSectionApiController::class, 'summary']);
Route::get('/gallery/categories', [GalleryApiController::class, 'index']);
Route::get('/gallery/categories/{category}', [GalleryApiController::class, 'show']);
Route::get('/latest-album', [LatestAlbumApiController::class, 'show']);
Route::get('/home-data', [HomeApiController::class, 'index']);
Route::get('/home-sections-manage', [HomeSectionApiController::class, 'index']);
Route::get('/reviews', [ReviewApiController::class, 'index']);
Route::get('/reviews/{id}', [ReviewApiController::class, 'show']);
Route::post('/reviews', [ReviewApiController::class, 'store']);
Route::get('/favicon', [SettingsApiController::class, 'getFavicon']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Bind 'category' to GalleryCategory
Route::bind('category', function ($value) {
    return GalleryCategory::findOrFail($value);
});
