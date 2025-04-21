<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LatestAlbumCollection extends JsonResource
{
    public function toArray($request)
    {
        if (is_null($this->resource)) {
            return null;
        }
        return [
            'latestAlbumTitle' => $this->album_title,
            'albumLabel' => $this->album_label,
            'albumReleased' => $this->album_released,
            'albumGenre' => $this->album_genre,
            'albumStyles' => $this->album_styles,
            'albumImage' => $this->album_image,
            'amazonLink' => $this->album_amazon_link,
            'appleLink' => $this->album_apple_link,
            'youtubeLink' => $this->album_youtube_link,
            'spotifyLink' => $this->album_spotify_link,
            'songs' => new SongCollection($this->songs)
        ];
    }
}


