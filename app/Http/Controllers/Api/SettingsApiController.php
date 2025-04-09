<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingsCollection;
use App\Http\Resources\SlidersCollection;
use App\Models\Setting;
use App\Models\Slider;

class SettingsApiController extends Controller
{
    // Fetch all settings data in separate objects
    public function getAllSettings()
    {

        $settings = Setting::all();;
        $sliders = Slider::all();

        return new SettingsCollection($settings, $sliders);

        // If you expect multiple settings entries, then return like this:
        // return response()->json(SettingsCollection::collection($settings));
    }
}


