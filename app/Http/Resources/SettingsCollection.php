<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SettingsCollection extends ResourceCollection
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
        return $this->collection->map(function ($setting) {
            return [
                'presentationSection' => [
                    'title' => $setting->title,
                    'description' => $setting->description,
                    'upcomingDateFrom' => $setting->upcoming_date_from,
                    'upcomingDateTo' => $setting->upcoming_date_to,
                    'upcomingLocation' => $setting->upcoming_location,
                    'upcomingState' => $setting->upcoming_state,
                    'upcomingCountry' => $setting->upcoming_country,
                ],
                'socialLinks' => [
                    'instagramLink' => $setting->instagram_link,
                    'facebookLink' => $setting->facebook_link,
                    'twitterLink' => $setting->twitter_link,
                    'youtubeLink' => $setting->youtube_link,
                    'appleLink' => $setting->apple_link,
                    'amazonLink' => $setting->amazon_link,
                ],

                'sliders' => new SlidersCollection($this->sliders),
            ];
        })->toArray();
    }
}
