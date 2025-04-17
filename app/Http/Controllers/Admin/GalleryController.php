<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::all();
        return Inertia::render('Admin/Gallery/Index', [
            'galleries' => $galleries
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        foreach ($request->file('gallery_images', []) as $image) {
            $path = $image->store('gallery', 'public');
            Gallery::create(['gallery_image' => $path]);
        }

        return redirect()->back()->with('success', 'Images added successfully.');
    }

    public function destroy(Gallery $gallery)
    {
        Storage::disk('public')->delete($gallery->gallery_image);
        $gallery->delete();

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }
}

