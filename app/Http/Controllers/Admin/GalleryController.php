<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        $categories = GalleryCategory::with('galleries')->get();
        return Inertia::render('Admin/Gallery/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'folder_name' => 'required|string|max:255|unique:gallery_categories',
            'gallery_category_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1536',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1536',
            'gallery_image_descriptions.*' => 'nullable|string|max:1000'
        ], [
            'gallery_category_image.max' => 'Category image must be no larger than 1.5MB.',
            'gallery_images.*.max' => 'Each gallery image must be no larger than 1.5MB.',
            'folder_name.unique' => 'This folder name already exists.'
        ]);

        $categoryData = ['folder_name' => $request->folder_name];

        if ($request->hasFile('gallery_category_image')) {
            $path = $request->file('gallery_category_image')->store('gallery/category_images', 'public');
            $categoryData['gallery_category_image'] = $path;
        }

        $category = GalleryCategory::create($categoryData);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images', []) as $index => $image) {
                $path = $image->store("gallery/{$category->folder_name}", 'public');
                $description = $request->gallery_image_descriptions[$index] ?? null;
                $category->galleries()->create([
                    'gallery_image' => $path,
                    'gallery_image_description' => $description
                ]);
            }
        }

        return redirect()->route('gallery.index')->with('success', 'Category created successfully.');
    }

    public function edit(GalleryCategory $category)
    {
        $category->load('galleries');
        return Inertia::render('Admin/Gallery/Edit', [
            'category' => [
                'id' => $category->id,
                'folder_name' => $category->folder_name,
                'gallery_category_image' => $category->gallery_category_image ? "/storage/{$category->gallery_category_image}" : null,
                'galleries' => $category->galleries->map(function ($gallery) {
                    return [
                        'id' => $gallery->id,
                        'gallery_image' => $gallery->gallery_image,
                        'gallery_image_description' => $gallery->gallery_image_description
                    ];
                })->toArray()
            ]
        ]);
    }

    public function update(Request $request, GalleryCategory $category)
    {
        $request->validate([
            'folder_name' => 'required|string|max:255|unique:gallery_categories,folder_name,' . $category->id,
            'gallery_category_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1536',
            'remove_category_image' => 'nullable|boolean',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1536',
            'gallery_image_descriptions.*' => 'nullable|string|max:1000',
            'existing_images.*' => 'nullable|integer|exists:galleries,id',
            'existing_descriptions.*' => 'nullable|string|max:1000'
        ]);

        $categoryData = ['folder_name' => $request->folder_name];

        if ($request->hasFile('gallery_category_image')) {
            // Delete old image if exists
            if ($category->gallery_category_image) {
                Storage::disk('public')->delete($category->gallery_category_image);
            }
            $path = $request->file('gallery_category_image')->store('gallery/category_images', 'public');
            $categoryData['gallery_category_image'] = $path;
        } elseif ($request->remove_category_image && $category->gallery_category_image) {
            Storage::disk('public')->delete($category->gallery_category_image);
            $categoryData['gallery_category_image'] = null;
        }

        $category->update($categoryData);

        if ($request->has('existing_images')) {
            foreach ($request->existing_images as $index => $galleryId) {
                $gallery = Gallery::find($galleryId);
                if ($gallery && $gallery->gallery_category_id === $category->id) {
                    $description = $request->existing_descriptions[$index] ?? null;
                    $gallery->update(['gallery_image_description' => $description]);
                }
            }
        }

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images', []) as $index => $image) {
                $path = $image->store("gallery/{$category->folder_name}", 'public');
                $description = $request->gallery_image_descriptions[$index] ?? null;
                $category->galleries()->create([
                    'gallery_image' => $path,
                    'gallery_image_description' => $description
                ]);
            }
        }

        return redirect()->route('gallery.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(GalleryCategory $category)
    {
        // Delete category image if exists
        if ($category->gallery_category_image) {
            Storage::disk('public')->delete($category->gallery_category_image);
        }

        foreach ($category->galleries as $gallery) {
            Storage::disk('public')->delete($gallery->gallery_image);
            $gallery->delete();
        }
        $category->delete();

        return redirect()->route('gallery.index')->with('success', 'Category deleted successfully.');
    }

    public function destroyImage(Gallery $gallery)
    {
        Storage::disk('public')->delete($gallery->gallery_image);
        $gallery->delete();

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }
}
