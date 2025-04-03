<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogCollection;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogApiController extends Controller
{
    // Get all blog posts
    public function index()
    {
        $data = Blog::all();
        return response()->json(new  BlogCollection($data), 200);
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
