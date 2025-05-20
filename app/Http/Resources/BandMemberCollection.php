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
                'country' => $bandMember->country,
                'description' => $bandMember->description,
                'facebookLink' => $bandMember->facebook_link,
                'instagramLink' => $bandMember->instagram_link,
                'wikipediaLink' => $bandMember->wikipedia_link,
                'webpageLink' => $bandMember->webpage_link,
                'youtubeLink' => $bandMember->youtube_link,
                'order' => $bandMember->order,
                'isActive' => (bool) $bandMember->is_active,
                'isHead' => (bool) $bandMember->is_head,
                'memberImages' => is_array($bandMember->band_member_images) ? $bandMember->band_member_images : [],
                'createdAt' => $bandMember->created_at,
                'updatedAt' => $bandMember->updated_at,
            ];
        })->toArray();
    }
}
