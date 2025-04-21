<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SongCollection extends ResourceCollection
{
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($song) {
            return [
                'songTitle' => $song->song_title,
                'songOwner' => $song->song_owner,
                'songLyrics' => $song->song_lyrics,
                'songLink' => $song->song_link,
            ];
        });
    }
}

