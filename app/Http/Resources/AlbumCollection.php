<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AlbumCollection extends ResourceCollection
{
    /**
     * Transform the collection into an array.
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($album) {
            return [
                'id' => $album->id,
                'albumName' => $album->album_name,
                'albumLabel' => $album->album_label,
                'releasedDate' => $album->released_date,
                'albumGenre' => $album->album_genre,
                'albumStyles' => $album->album_styles,
                'albumImage' => $album->album_image,
                'albumThumbnail' => $album->album_thumbnail,
                'amazonLink' => $album->amazon_link,
                'appleLink' => $album->apple_link,
                'youtubeLink' => $album->youtube_link,
                'spotifyLink' => $album->spotify_link,
                'songs' => new SongCollection($album->songs),
                'createdAt' => $album->created_at->toIso8601String(),
                'updatedAt' => $album->updated_at->toIso8601String(),
            ];
        })->toArray();
    }
}
