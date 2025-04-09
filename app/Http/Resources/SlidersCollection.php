<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SlidersCollection extends ResourceCollection
{
    /**
     * Transform the sliders data into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($slider) {
            return [
                'sliderTitle' => $slider->slider_title,
                'sliderShortDescription' => $slider->slider_short_description,
                'sliderImage' => $slider->slider_image,
                'sliderVideoLink' => $slider->slider_video_link,
            ];
        })->toArray();
    }
}
