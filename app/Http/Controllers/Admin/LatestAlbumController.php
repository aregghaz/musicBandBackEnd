<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LatestAlbum;
use App\Models\Song;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LatestAlbumController extends Controller
{
    public function index()
    {
        $album = LatestAlbum::with('songs')->first();
        return Inertia::render('Admin/LatestAlbum/Index', [
            'album' => $album
        ]);
    }

    public function storeOrUpdate(Request $request)
    {
        $data = $request->validate([
            'album_title' => 'required|string',
            'album_label' => 'nullable|string',
            'album_released' => 'nullable|date',
            'album_genre' => 'nullable|string',
            'album_styles' => 'nullable|string',
            'album_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'album_amazon_link' => 'nullable|string',
            'album_apple_link' => 'nullable|string',
            'album_youtube_link' => 'nullable|string',
            'album_spotify_link' => 'nullable|string',
        ]);

        $album = LatestAlbum::first();

        // Handle image
        if ($request->hasFile('album_image')) {
            if ($album && $album->album_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $album->album_image));
            }
            $imagePath = $request->file('album_image')->store('albums', 'public');
            $data['album_image'] = '/storage/' . $imagePath;
        }

        if ($album) {
            $album->update($data);
        } else {
            $album = LatestAlbum::create($data);
        }

        // ✅ Handle songs
        $songs = $request->input('songs', []);

        // Remove existing songs not present in request (if id is missing)
        $existingSongIds = collect($songs)->pluck('id')->filter();
        Song::where('latest_album_id', $album->id)
            ->whereNotIn('id', $existingSongIds)
            ->delete();

        foreach ($songs as $songData) {
            $validatedSongData = [
                'latest_album_id' => $album->id,
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

        return redirect()->route('latest-album.index')->with('success', 'Album and songs saved successfully.');
    }
}
