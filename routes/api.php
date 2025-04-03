<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogApiController;
use App\Http\Controllers\Api\ConcertApiController;
use App\Http\Controllers\Api\BandMemberApiController;
use App\Http\Controllers\Admin\ConcertController;

Route::get('/blogs', [BlogApiController::class, 'index']);
Route::get('/blogs/{id}', [BlogApiController::class, 'show']);
Route::get('/concerts/type/{type}', [ConcertApiController::class, 'getConcertsByType']);
Route::get('/band-members', [BandMemberApiController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});









