<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploadHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\SettingsCollection;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::first();
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
            'about_background_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1536',
            'remove_about_background_image' => 'nullable|boolean',
            'about_background_image_mob' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1536',
            'remove_about_background_image_mob' => 'nullable|boolean',
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

        $settings = Setting::firstOrNew(['id' => 1]);

        if ($request->hasFile('about_background_image')) {
            if ($settings && $settings->about_background_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->about_background_image));
            }
            $path = $request->file('about_background_image')->store('settings', 'public');
            $validated['about_background_image'] = '/storage/' . $path;
        }
        elseif ($request->input('remove_about_background_image') === '1') {
            if ($settings && $settings->about_background_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->about_background_image));
            }
            $validated['about_background_image'] = null;
        }
        else {
            unset($validated['about_background_image']);
        }



        if ($request->hasFile('about_background_image_mob')) {
            if ($settings && $settings->about_background_image_mob) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->about_background_image_mob));
            }
            $path = $request->file('about_background_image_mob')->store('settings', 'public');
            $validated['about_background_image_mob'] = '/storage/' . $path;
        }
        elseif ($request->input('remove_about_background_image_mob') === '1') {
            if ($settings && $settings->about_background_image_mob) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $settings->about_background_image_mob));
            }
            $validated['about_background_image_mob'] = null;
        }
        else {
            unset($validated['about_background_image_mob']);
        }





        $settings->fill($validated)->save();


        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
