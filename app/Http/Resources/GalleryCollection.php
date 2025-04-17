<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GalleryCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($data) {
            return [
                "id" => $data->id,
                "galleryImage" => '/storage/' . $data->gallery_image,
                "createdAt" => $data->created_at,
            ];
        })->toArray();
    }
}


