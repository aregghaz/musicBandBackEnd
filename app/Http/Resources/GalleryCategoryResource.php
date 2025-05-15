<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class GalleryCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'folderName' => $this->folder_name,
            'folderImage' => $this->gallery_category_image,
            'galleries' => $this->galleries->map(function ($gallery) {
                return [
                    'id' => $gallery->id,
                    'galleryImage' => Storage::url($gallery->gallery_image),
                    'galleryImageDescription' => $gallery->gallery_image_description
                ];
            })->toArray()
        ];
    }
}
