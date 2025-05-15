<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GalleryCategoryCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($data) {
            return [
                'id' => $data->id,
                'folderName' => $data->folder_name,
            ];
        })->toArray();
    }
}
