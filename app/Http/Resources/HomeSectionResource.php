<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeSectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at,
            'slidersSection' => $this->slider_section,
            'aboutSection' => $this->about_section,
            'albumSection' => $this->album_section,
            'latestAlbumSection' => $this->latest_album_section,
            'contactsSection' => $this->contacts_section,
            'toursSection' => $this->tours_section,
            'concertsSection' => $this->concerts_section,
            'bandMembersSection' => $this->band_members_section,
            'gallerySection' => $this->gallery_section,
            'blogsSection' => $this->blogs_section,
            'aboutUsNewsSection' => $this->about_us_news_section,
        ];
    }
}
