<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlbumCollection;
use App\Models\Album;


class AlbumApiController extends Controller
{
    /**
     * Fetch all albums.
     *
     * @return AlbumCollection
     */
    public function getAlbums()
    {
        $albums = Album::all();

        return new AlbumCollection($albums);
    }
}

