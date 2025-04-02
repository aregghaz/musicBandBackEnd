<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;



use App\Http\Resources\BlogCollection;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of blogs with search functionality
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $blogs = Blog::query()
            ->when($search, function ($query) use ($search) {
                return $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            })
            ->get();

        // Return the blogs inside an Inertia response
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => new BlogCollection($blogs),
            'search' => $search,  // Optionally pass search term
        ]);
    }

    /**
     * Show the form for creating a new blog
     */
    public function create()
    {
        return Inertia::render('Admin/Blogs/Create');
    }

    /**
     * Store new blog
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            // Add other fields as needed
        ]);

        Blog::create($validated);

        return redirect()
            ->route('blogs.index')
            ->with('success', 'Blog created successfully');
    }

    /**
     * Show edit form
     */
    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog
        ]);
    }

    /**
     * Update blog
     */
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            // Add other fields as needed
        ]);

        $blog->update($validated);

        return redirect()
            ->route('blogs.index')
            ->with('success', 'Blog updated successfully');
    }

    /**
     * Remove the specified blog
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()
            ->route('blogs.index')
            ->with('success', 'Blog deleted successfully');
    }
}

