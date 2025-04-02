<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
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
            'blogs' => $blogs
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blogs/Create');
    }

    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|string',

            'translations' => 'required|array',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);


        $blog = Blog::create([
            'image' => $request->input('image'),
            'translations' => $request->input('translations'),
        ]);

        return redirect()->route('blogs.index');
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'image' => 'nullable|string',

            'translations' => 'required|array',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.description' => 'required|string',
        ]);


        $blog->update([
            'image' => $request->input('image'),
            'translations' => $request->input('translations'),
        ]);

        return redirect()->route('blogs.index');
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->route('blogs.index');
    }
}



