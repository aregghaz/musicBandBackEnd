<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/data', function () {
    return response()->json(['message' => 'Hello from Laravel API!']);
});
