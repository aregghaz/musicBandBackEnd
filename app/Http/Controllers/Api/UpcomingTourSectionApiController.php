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

        if ($sections->isEmpty()) {
            return response()->json([
                'message' => 'No upcoming tour sections found.'
            ], 404);
        }

        return new UpcomingTourSectionCollection($sections);
    }

    public function summary()
    {
        $section = UpcomingTourSection::with('tours')->first();
        $setting = Setting::first();

        if (!$section) {
            return response()->json([
                'message' => 'No upcoming tour section found.'
            ], 404);
        }

        return new UpcomingTourSummaryCollection($section,$setting);
    }
}
