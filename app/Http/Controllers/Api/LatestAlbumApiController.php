<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LatestAlbumCollection;
use App\Models\LatestAlbum;


class LatestAlbumApiController extends Controller
{
    public function show()
    {

        $album = LatestAlbum::with('songs')->first();
//        return $album;
        return new LatestAlbumCollection($album);

    }
}
