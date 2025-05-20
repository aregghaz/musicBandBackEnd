<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingsCollection;
use App\Http\Resources\SlidersCollection;
use App\Models\Setting;
use App\Models\Slider;

class SettingsApiController extends Controller
{
    public function getAllSettings()
    {

        $settings = Setting::first();
        $sliders = Slider::all();

        return new SettingsCollection($settings, $sliders);

    }
}


