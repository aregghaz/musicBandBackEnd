<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'albumName' => $this->album_name,
            'albumLabel' => $this->album_label,
            'releasedDate' => $this->released_date,
            'albumGenre' => $this->album_genre,
            'albumStyles' => $this->album_styles,
            'albumImage' => $this->album_image,
            'albumThumbnail' => $this->album_thumbnail,
            'amazonLink' => $this->amazon_link,
            'appleLink' => $this->apple_link,
            'youtubeLink' => $this->youtube_link,
            'spotifyLink' => $this->spotify_link,
            'songs' => new SongCollection($this->songs),
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
        ];
    }
}
