<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index()
    {
        $albums = Album::all(); // Get all albums
        return Inertia::render('Admin/Albums/Index', ['albums' => $albums]);
    }

    public function create()
    {
        return Inertia::render('Admin/Albums/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'album_name' => 'required|string|max:255',
            'released_date' => 'required|date',
            'album_image' => 'nullable|string',
            'apple_link' => 'nullable|url',
            'amazon_link' => 'nullable|url',
            'spotify_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
        ]);

        // Create a new album with the provided data
        Album::create($request->all());
        return redirect()->route('albums.index');
    }

    public function edit(Album $album)
    {
        return Inertia::render('Admin/Albums/Edit', ['album' => $album]);
    }

    public function update(Request $request, Album $album)
    {
        $request->validate([
            'album_name' => 'required|string|max:255',
            'released_date' => 'required|date',
            'album_image' => 'nullable|string',
            'apple_link' => 'nullable|url',
            'amazon_link' => 'nullable|url',
            'spotify_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
        ]);

        // Update the album with the provided data
        $album->update($request->all());
        return redirect()->route('albums.index');
    }

    public function destroy(Album $album)
    {
        $album->delete(); // Delete the album
        return redirect()->route('albums.index');
    }
}
