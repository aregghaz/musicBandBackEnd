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
                'concertCity' => $concert->concert_city,
                'concertPlace' => $concert->concert_place,
                'concertDate' => $concert->concert_date,
                'type' => $concert->type,
                'concertImage' => $concert->concert_image,
                'createdAt' => $concert->created_at->toIso8601String(),
                'updatedAt' => $concert->updated_at->toIso8601String(),
            ];
        })->toArray();
    }
}
