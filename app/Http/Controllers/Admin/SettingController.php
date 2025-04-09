<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::first(); // We assume there's only one row
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }

    public function storeOrUpdate(Request $request)
    {
        $validated = $request->validate([
            // Presentation section
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'upcoming_date_from' => 'nullable|date',
            'upcoming_date_to' => 'nullable|date',
            'upcoming_location' => 'nullable|string|max:255',
            'upcoming_state' => 'nullable|string|max:255',
            'upcoming_country' => 'nullable|string|max:255',

            // Social Links
            'instagram_link' => 'nullable|url',
            'facebook_link' => 'nullable|url',
            'twitter_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
            'apple_link' => 'nullable|url',
            'amazon_link' => 'nullable|url',
        ]);

        Setting::updateOrCreate(['id' => 1], $validated);

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}

