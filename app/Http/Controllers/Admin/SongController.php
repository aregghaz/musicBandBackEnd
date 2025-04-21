<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Song;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SongController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'latest_album_id' => 'required|exists:latest_albums,id',
            'song_title' => 'required|string',
            'song_owner' => 'nullable|string',
            'song_lyrics' => 'nullable|string',
            'song_link' => 'nullable|string',
        ]);

        Song::create($validated);
        return back();
    }

    public function update(Request $request, Song $song)
    {
        $validated = $request->validate([
            'song_title' => 'required|string',
            'song_owner' => 'nullable|string',
            'song_lyrics' => 'nullable|string',
            'song_link' => 'nullable|string',
        ]);

        $song->update($validated);
        return back();
    }

    public function destroy(Song $song)
    {
        $song->delete();
        return back();
    }
}

