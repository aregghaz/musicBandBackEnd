<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UpcomingTourSummaryCollection extends JsonResource
{
    protected $setting;

    public function __construct($resource, $setting)
    {
        parent::__construct($resource);
        $this->setting = $setting;
    }

    public function toArray(Request $request): array
    {
        if (!$this->resource) {
            return [
                'title' => '',
                'tourCount' => 0,
                'closestDate' => null,
                'furthestDate' => null,
                'upcomingLocation' => $this->setting?->upcoming_location ?? '',
                'upcomingState' => $this->setting?->upcoming_state ?? '',
                'upcomingCountry' => $this->setting?->upcoming_country ?? '',
            ];
        }

        $tours = $this->tours ?? collect();

        return [
            'title' => $this->title,
            'tourCount' => $tours->count(),
            'closestDate' => $tours->min('pre_sale_start'),
            'furthestDate' => $tours->max('pre_sale_end'),
            'upcomingLocation' => $this->setting?->upcoming_location ?? '',
            'upcomingState' => $this->setting?->upcoming_state ?? '',
            'upcomingCountry' => $this->setting?->upcoming_country ?? '',
        ];
    }

}
