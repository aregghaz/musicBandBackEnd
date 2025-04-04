<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BandMemberCollection extends ResourceCollection
{
    /**
     * Transform the collection into an array.
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($bandMember) {
            return [
                'id' => $bandMember->id,
                'firstName' => $bandMember->first_name,
                'lastName' => $bandMember->last_name,
                'role' => $bandMember->role,
                'memberImage' => $bandMember->band_member_image,
                'createdAt' => $bandMember->created_at,
                'updatedAt' => $bandMember->updated_at,
            ];
        })->toArray();
    }
}
