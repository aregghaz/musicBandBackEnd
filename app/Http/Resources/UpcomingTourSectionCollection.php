<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UpcomingTourSectionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     */
    public function toArray($request): array
    {
        return $this->collection->map(function ($section) {
            $tours = $section->tours;
            $tourCount = $tours->count();
            $closestDate = $tours->min('pre_sale_start');
            $furthestDate = $tours->max('pre_sale_start');

            return [
                'title' => $section->title,
                'tourCount' => $tourCount,
                'closestDate' => $closestDate,
                'furthestDate' => $furthestDate,
                'tours' => $section->tours->map(function ($tour) {
                    return [
                        'preSaleStart' => $tour->pre_sale_start,
                        'preSaleEnd' => $tour->pre_sale_end,
                    ];
                })->toArray(),
            ];
        })->toArray();
    }
}
