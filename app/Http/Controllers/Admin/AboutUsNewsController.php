<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUsNews;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AboutUsNewsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $query = AboutUsNews::query();

        if ($search && strlen($search) >= 2) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('topicLink', 'like', "%{$search}%");
        }

        $news = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/AboutUsNews/Index', [
            'news' => $news,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AboutUsNews/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'topicLink' => 'required|url|max:255',
        ]);

        $newsData = $validated;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('about-us-news', 'public');
            $newsData['image'] = Storage::url($path);
        }

        AboutUsNews::create($newsData);

        return redirect()->route('about-us-news.index')->with('success', 'News created successfully.');
    }

    public function show(AboutUsNews $aboutUsNews)
    {
        // Optional: Render a show page if needed, otherwise redirect
        return redirect()->route('about-us-news.index');
    }

    public function edit(AboutUsNews $aboutUsNews)
    {
        return Inertia::render('Admin/AboutUsNews/Edit', [
            'news' => $aboutUsNews,
            'csrf_token' => csrf_token(),
        ]);
    }

    public function update(Request $request, AboutUsNews $aboutUsNews)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'image_remove' => 'nullable|boolean',
            'topicLink' => 'required|url|max:255',
        ]);

        $newsData = $validated;

        if ($request->hasFile('image')) {
            if ($aboutUsNews->image) {
                // Extract the storage path from the URL (e.g., 'storage/about-us-news/image.jpg' → 'about-us-news/image.jpg')
                $oldPath = str_replace('storage/', '', $aboutUsNews->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('about-us-news', 'public');
            $newsData['image'] = Storage::url($path); // Saves as 'storage/about-us-news/[filename]'
        } elseif ($request->input('image_remove')) {
            if ($aboutUsNews->image) {
                $oldPath = str_replace('storage/', '', $aboutUsNews->image);
                Storage::disk('public')->delete($oldPath);
            }
            $newsData['image'] = null;
        } else {
            $newsData['image'] = $aboutUsNews->image;
        }

        unset($newsData['image_remove']);

        $aboutUsNews->update($newsData);

        return redirect()->route('about-us-news.index')->with('success', 'News updated successfully.');
    }

    public function destroy(AboutUsNews $aboutUsNews)
    {
        if ($aboutUsNews->image) {
            $path = str_replace('storage/', '', $aboutUsNews->image);
            Storage::disk('public')->delete($path);
        }

        $aboutUsNews->delete();

        return redirect()->route('about-us-news.index')->with('success', 'News deleted successfully.');
    }
}
