<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AlbumController extends Controller
{
    public function index()
    {
        $albums = Album::all();
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
            'album_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'apple_link' => 'nullable|url',
            'amazon_link' => 'nullable|url',
            'spotify_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
        ]);

        $albumData = $request->only([
            'album_name',
            'released_date',
            'apple_link',
            'amazon_link',
            'spotify_link',
            'youtube_link',
        ]);

        // Handle image upload
        if ($request->hasFile('album_image')) {
            $path = $request->file('album_image')->store('albums', 'public');
            $albumData['album_image'] = Storage::url($path);
        }

        Album::create($albumData);

        return redirect()->route('albums.index');
    }

    public function edit(Album $album)
    {
        return Inertia::render('Admin/Albums/Edit', ['album' => $album]);
    }

    public function update(Request $request, Album $album)
    {
        // Only validate album_image if a new file is uploaded, not when it's empty
        $request->validate([
            'album_name' => 'required|string|max:255',
            'released_date' => 'required|date',
            'album_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'apple_link' => 'nullable|url',
            'amazon_link' => 'nullable|url',
            'spotify_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
        ]);

        // Prepare data for update
        $albumData = $request->only([
            'album_name',
            'released_date',
            'apple_link',
            'amazon_link',
            'spotify_link',
            'youtube_link',
        ]);


        if ($request->hasFile('album_image')) {
            $path = $request->file('album_image')->store('albums', 'public');
            $albumData['album_image'] = '/storage/' . $path;
        }

        $album->update($albumData);

        return redirect()->route('albums.index');
    }


    public function destroy(Album $album)
    {
        $album->delete();
        return redirect()->route('albums.index');
    }
}
