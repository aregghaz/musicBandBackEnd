<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploadHelper;
use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::all();
        return inertia('Admin/Sliders/Index', [
            'sliders' => $sliders
        ]);
    }

    public function create()
    {
        return inertia('Admin/Sliders/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'slider_title' => 'required|string|max:255',
            'slider_short_description' => 'required|string|max:255',
            'slider_video_link' => 'nullable|url',
            'slider_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'slider_image_mob' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $slider = new Slider();
        $slider->slider_title = $request->slider_title;
        $slider->slider_short_description = $request->slider_short_description;
        $slider->slider_video_link = $request->slider_video_link;

        // Handle image uploads using helper
        ImageUploadHelper::handleImageUpload(
            $request,
            $slider,
            'slider_image',
            'remove_image',
            'slider_image',
            'sliders'
        );

        ImageUploadHelper::handleImageUpload(
            $request,
            $slider,
            'slider_image_mob',
            'remove_image_mob',
            'slider_image_mob',
            'sliders'
        );

        $slider->save();

        return redirect()->route('sliders.index');
    }

    public function edit(Slider $slider)
    {
        return inertia('Admin/Sliders/Edit', [
            'slider' => $slider
        ]);
    }

    public function update(Request $request, Slider $slider)
    {
        $request->validate([
            'slider_title' => 'required|string|max:255',
            'slider_short_description' => 'required|string|max:255',
            'slider_video_link' => 'nullable|url',
            'slider_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'slider_image_mob' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'remove_image' => 'nullable|boolean',
            'remove_image_mob' => 'nullable|boolean',
        ]);

        $slider->slider_title = $request->slider_title;
        $slider->slider_short_description = $request->slider_short_description;
        $slider->slider_video_link = $request->slider_video_link;

        // Handle image uploads using helper
        ImageUploadHelper::handleImageUpload(
            $request,
            $slider,
            'slider_image',
            'remove_image',
            'slider_image',
            'sliders'
        );

        ImageUploadHelper::handleImageUpload(
            $request,
            $slider,
            'slider_image_mob',
            'remove_image_mob',
            'slider_image_mob',
            'sliders'
        );

        $slider->save();

        return redirect()->route('sliders.index');
    }

    public function destroy(Slider $slider)
    {
        // Delete associated images
        if ($slider->slider_image) {
            $oldPath = str_replace('/storage/', '', $slider->slider_image);
            Storage::disk('public')->delete($oldPath);
        }
        if ($slider->slider_image_mob) {
            $oldPathMob = str_replace('/storage/', '', $slider->slider_image_mob);
            Storage::disk('public')->delete($oldPathMob);
        }

        $slider->delete();
        return redirect()->route('sliders.index');
    }
}
