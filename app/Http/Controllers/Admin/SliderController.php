<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

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
        ]);

        $slider = new Slider();
        $slider->slider_title = $request->slider_title;
        $slider->slider_short_description = $request->slider_short_description;
        $slider->slider_video_link = $request->slider_video_link;

        // Handling image upload
        if ($request->hasFile('slider_image')) {
            $imagePath = $request->file('slider_image')->store('sliders', 'public');
            $slider['slider_image'] = '/storage/' . $imagePath;
        }

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
        ]);

        $slider->slider_title = $request->slider_title;
        $slider->slider_short_description = $request->slider_short_description;
        $slider->slider_video_link = $request->slider_video_link;

        if ($request->hasFile('slider_image')) {
            $imagePath = $request->file('slider_image')->store('sliders', 'public');
            $slider['slider_image'] = '/storage/' . $imagePath;
        }

        $slider->save();

        return redirect()->route('sliders.index');
    }

    public function destroy(Slider $slider)
    {
        $slider->delete();
        return redirect()->route('sliders.index');
    }
}
