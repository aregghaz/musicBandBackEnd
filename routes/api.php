<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogApiController;
use App\Http\Controllers\Api\ConcertApiController;
use App\Http\Controllers\Api\BandMemberApiController;
use App\Http\Controllers\Api\AlbumApiController;
use App\Http\Controllers\Api\ContactApiController;
use App\Http\Controllers\Api\SettingsApiController;

Route::get('/blogs', [BlogApiController::class, 'index']);
Route::get('/blogs/{id}', [BlogApiController::class, 'show']);
Route::get('/concerts/type/{type}', [ConcertApiController::class, 'getConcertsByType']);
Route::get('/band-members', [BandMemberApiController::class, 'index']);
Route::get('/albums', [AlbumApiController::class, 'getAlbums']);
Route::get('/contacts', [ContactApiController::class, 'index']);
Route::get('/settings', [SettingsApiController::class, 'getAllSettings']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});









