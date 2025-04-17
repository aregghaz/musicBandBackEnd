<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryCollection;
use App\Models\Gallery;


class GalleryApiController extends Controller
{
    public function index()
    {
        $galleries = Gallery::orderBy('created_at', 'desc')->get();

        return new GalleryCollection($galleries);
    }
}
