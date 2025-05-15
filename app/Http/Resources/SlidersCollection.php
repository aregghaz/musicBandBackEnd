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
                'sliderImageMob' => $slider->slider_image_mob,
                'sliderVideoLink' => $slider->slider_video_link,
                'sliderTitleColor'=> $slider->slider_title_color,
                'sliderTitleSize' => $slider->slider_title_size,
                'sliderShortDescColor'=> $slider->slider_short_desc_color,
                'sliderShortDescSize'=> $slider->slider_short_desc_size,
                'sliderTitleSizeMobile'=> $slider->slider_title_size_mobile,
                'sliderShortDescSizeMobile'=> $slider->slider_short_desc_size_mobile,
            ];
        })->toArray();
    }
}
