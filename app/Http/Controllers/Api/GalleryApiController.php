<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryCategoryCollection;
use App\Http\Resources\GalleryCategoryResource;
use App\Models\GalleryCategory;

class GalleryApiController extends Controller
{
    public function index()
    {
        $categories = GalleryCategory::select('id', 'folder_name')->get();
        return new GalleryCategoryCollection($categories);
    }

    public function show(GalleryCategory $category)
    {
        $category->load('galleries');
        return new GalleryCategoryResource($category);
    }
}
