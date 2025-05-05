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
        $album = LatestAlbum::first();

        $data = $request->validate([
            'album_title' => 'required|string',
            'album_label' => 'nullable|string',
            'album_released' => 'nullable|date',
            'album_genre' => 'nullable|string',
            'album_styles' => 'nullable|string',
            'album_image' => 'nullable',
            'album_amazon_link' => 'nullable|string',
            'album_apple_link' => 'nullable|string',
            'album_youtube_link' => 'nullable|string',
            'album_spotify_link' => 'nullable|string',
        ]);


        if ($request->hasFile('album_image')) {
            if ($album && $album->album_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $album->album_image));
            }
            $path = $request->file('album_image')->store('albums', 'public');
            $data['album_image'] = '/storage/' . $path;
        }
        elseif ($request->input('remove_image') === '1') {
            if ($album && $album->album_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $album->album_image));
            }
            $data['album_image'] = null;
        }
        else {
            unset($data['album_image']);
        }

        if ($album) {
            $album->update($data);
        } else {
            $album = LatestAlbum::create($data);
        }

        $songs = $request->input('songs', []);
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
