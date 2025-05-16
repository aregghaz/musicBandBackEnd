<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutUsNewsCollection;
use App\Http\Resources\AboutUsNewsResource;
use App\Models\AboutUsNews;


class AboutUsNewsApiController extends Controller
{

    public function index()
    {
        return new AboutUsNewsCollection(AboutUsNews::all());
    }

    public function show($id)
    {
        $aunews = AboutUsNews::find($id);

        if (!$aunews) {
            return response()->json(['error' => 'news not found'], 404);
        }

        return new AboutUsNewsResource($aunews);
    }
}
