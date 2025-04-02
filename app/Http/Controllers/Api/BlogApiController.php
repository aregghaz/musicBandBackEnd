<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogApiController extends Controller
{
    // Get all blog posts
    public function index()
    {
        return response()->json(Blog::all());
    }

    // Get a single blog post by ID
    public function show($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['error' => 'Blog not found'], 404);
        }

        return response()->json($blog);
    }
}
