<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingsCollection extends JsonResource
{
    protected $sliders;

    public function __construct($resource, $sliders)
    {
        parent::__construct($resource);
        $this->sliders = $sliders;
    }

    /**
     * Transform the settings data into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'presentationSection' => [
                'title' => $this->title ?? null,
                'description' => $this->description ?? null,
                'upcomingDateFrom' => $this->upcoming_date_from ?? null,
                'upcomingDateTo' => $this->upcoming_date_to ?? null,
                'upcomingLocation' => $this->upcoming_location ?? null,
                'upcomingState' => $this->upcoming_state ?? null,
                'upcomingCountry' => $this->upcoming_country ?? null,
            ],
            'socialLinks' => [
                'instagramLink' => $this->instagram_link ?? null,
                'facebookLink' => $this->facebook_link ?? null,
                'twitterLink' => $this->twitter_link ?? null,
                'youtubeLink' => $this->youtube_link ?? null,
                'appleLink' => $this->apple_link ?? null,
                'amazonLink' => $this->amazon_link ?? null,
            ],
            'sliders' => new SlidersCollection($this->sliders),
        ];
    }
}
