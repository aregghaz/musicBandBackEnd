<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AlbumController extends Controller
{
    public function index()
    {
        $albums = Album::with('songs')->get();
        return Inertia::render('Admin/Albums/Index', ['albums' => $albums]);
    }

    public function create()
    {
        return Inertia::render('Admin/Albums/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'album_name' => 'required|string|max:255',
            'album_label' => 'nullable|string',
            'released_date' => 'nullable|date',
            'album_genre' => 'nullable|string',
            'album_styles' => 'nullable|string',
            'album_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'apple_link' => 'nullable|url',
            'amazon_link' => 'nullable|url',
            'spotify_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
            'remove_image' => 'nullable|boolean',
        ]);

        if ($request->hasFile('album_image')) {
            $path = $request->file('album_image')->store('albums', 'public');
            $data['album_image'] = '/storage/' . $path;
        } else {
            unset($data['album_image']);
        }

        $album = Album::create($data);

        // Handle songs
        $songs = $request->input('songs', []);
        foreach ($songs as $songData) {
            $validatedSongData = [
                'album_id' => $album->id,
                'song_title' => $songData['song_title'] ?? '',
                'song_owner' => $songData['song_owner'] ?? '',
                'song_lyrics' => $songData['song_lyrics'] ?? '',
                'song_link' => $songData['song_link'] ?? '',
            ];
            Song::create($validatedSongData);
        }

        return redirect()->route('albums.index')->with('success', 'Album and songs created successfully.');
    }

    public function edit(Album $album)
    {
        $album->load('songs');
        return Inertia::render('Admin/Albums/Edit', ['album' => $album]);
    }

    public function update(Request $request, Album $album)
    {
        $data = $request->validate([
            'album_name' => 'required|string|max:255',
            'album_label' => 'nullable|string',
            'released_date' => 'nullable|date',
            'album_genre' => 'nullable|string',
            'album_styles' => 'nullable|string',
            'album_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'apple_link' => 'nullable|url',
            'amazon_link' => 'nullable|url',
            'spotify_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
            'remove_image' => 'nullable|boolean',
        ]);

        if ($request->hasFile('album_image')) {
            if ($album->album_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $album->album_image));
            }
            $path = $request->file('album_image')->store('albums', 'public');
            $data['album_image'] = '/storage/' . $path;
        } elseif ($request->boolean('remove_image')) {
            if ($album->album_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $album->album_image));
            }
            $data['album_image'] = null;
        } else {
            unset($data['album_image']);
        }

        $album->update($data);

        // Handle songs
        $songs = $request->input('songs', []);
        $existingSongIds = collect($songs)->pluck('id')->filter();
        Song::where('album_id', $album->id)
            ->whereNotIn('id', $existingSongIds)
            ->delete();

        foreach ($songs as $songData) {
            $validatedSongData = [
                'album_id' => $album->id,
                'song_title' => $songData['song_title'] ?? '',
                'song_owner' => $songData['song_owner'] ?? '',
                'song_lyrics' => $songData['song_lyrics'] ?? '',
                'song_link' => $songData['song_link'] ?? '',
            ];

            if (isset($songData['id'])) {
                Song::where('id', $songData['id'])->update($validatedSongData);
            } else {
                Song::create($validatedSongData);
            }
        }

        return redirect()->route('albums.index')->with('success', 'Album and songs updated successfully.');
    }

    public function destroy(Album $album)
    {
        if ($album->album_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $album->album_image));
        }
        $album->songs()->delete();
        $album->delete();
        return redirect()->route('albums.index')->with('success', 'Album deleted successfully.');
    }
}
