<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ConcertCollection extends ResourceCollection
{
    /**
     * Transform the concert data into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($concert) {
            return [
                'id' => $concert->id,
                'concertCity' => $concert->concert_city,  // Convert to camelCase
                'concertPlace' => $concert->concert_place,  // Convert to camelCase
                'concertDate' => $concert->concert_date,  // Convert to camelCase
                'type' => $concert->type,
                'concertImage' => $concert->concert_image,  // Convert to camelCase
                'createdAt' => $concert->created_at->toIso8601String(),  // Convert to ISO string
                'updatedAt' => $concert->updated_at->toIso8601String(),  // Convert to ISO string
            ];
        })->toArray();
    }
}
