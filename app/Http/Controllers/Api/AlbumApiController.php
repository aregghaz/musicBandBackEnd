<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlbumCollection;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use Illuminate\Http\Request;

class AlbumApiController extends Controller
{
    /**
     * Fetch all albums.
     *
     * @return AlbumCollection
     */
    public function getAlbums()
    {
        $albums = Album::with('songs')->get();

        return new AlbumCollection($albums);
    }

    /**
     * Fetch a single album by ID.
     *
     * @param int $id
     * @return AlbumResource
     */
    public function getAlbum($id)
    {
        $album = Album::with('songs')->findOrFail($id);

        return new AlbumResource($album);
    }
}
