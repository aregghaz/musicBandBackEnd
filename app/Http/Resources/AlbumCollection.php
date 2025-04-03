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
                'albumImage' => $album->album_image,
                'releasedDate' => $album->released_date,
                'appleLink' => $album->apple_link,
                'amazonLink' => $album->amazon_link,
                'spotifyLink' => $album->spotify_link,
                'youtubeLink' => $album->youtube_link,
                'createdAt' => $album->created_at->toIso8601String(),
                'updatedAt' => $album->updated_at->toIso8601String(),
            ];
        })->toArray();
    }
}


