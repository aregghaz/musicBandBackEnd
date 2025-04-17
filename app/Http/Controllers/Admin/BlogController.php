<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogCollection;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $blogs = Blog::query()
            ->when($search, function ($query) use ($search) {
                return $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            })
            ->get();

        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => new BlogCollection($blogs),
            'search' => $search,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blogs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads/blogs', 'public');
            $validated['image'] = '/storage/' . $imagePath;
        }

        Blog::create($validated);

        return redirect()
            ->route('blogs.index')
            ->with('success', 'Blog created successfully');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_remove' => 'nullable|boolean',
        ]);

        // If user requests to remove the image
        if ($request->boolean('image_remove')) {
            $blog->image = null;
        }

        // If a new image is uploaded
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('uploads/blogs', 'public');
            $validated['image'] = '/storage/' . $imagePath;
            $blog->image = $validated['image'];
        }

        $blog->title = $validated['title'];
        $blog->description = $validated['description'];
        $blog->save();

        return redirect()->route('blogs.index')->with('success', 'Blog updated successfully.');
    }

    public function destroy(Blog $blog)
    {
        // Optionally delete the image file from storage if it exists
        if ($blog->image) {
            $oldImagePath = str_replace('/storage/', '', $blog->image);
            Storage::disk('public')->delete($oldImagePath);
        }

        $blog->delete();

        return redirect()
            ->route('blogs.index')
            ->with('success', 'Blog deleted successfully');
    }
}
