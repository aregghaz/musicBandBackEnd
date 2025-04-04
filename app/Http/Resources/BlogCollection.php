<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BlogCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Convert the collection to an array before returning it
        return $this->collection->map(function ($data) {
            return [
                "id" => $data->id,
                "title" => $data->title,
                "description" => $data->description,
                "image" => $data->image,
                "createdAt" => $data->created_at,
                "updatedAt" => $data->updated_at,
            ];
        })->toArray();  // <-- Convert collection to array
    }
}


