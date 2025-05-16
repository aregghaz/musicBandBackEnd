<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ReviewCollection extends ResourceCollection
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
                'id' => $data->id,
                'reviewerName' => $data->reviewer_name,
                'reviewerDescription' => $data->reviewer_description,
                'reviewHide' => $data->review_hide,
                'createdAt' => $data->created_at,
                'updatedAt' => $data->updated_at,
            ];
        })->toArray();
    }
}
