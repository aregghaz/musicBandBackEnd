<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\UpcomingTourSection;
use App\Http\Resources\UpcomingTourSectionCollection;
use App\Http\Resources\UpcomingTourSummaryCollection;

class UpcomingTourSectionApiController extends Controller
{
    public function index()
    {
        $sections = UpcomingTourSection::with('tours')->get();

        return new UpcomingTourSectionCollection($sections);
    }

    public function summary()
    {
        $section = UpcomingTourSection::with('tours')->first();
        $setting = Setting::first();
        return new UpcomingTourSummaryCollection($section,$setting);
    }
}
