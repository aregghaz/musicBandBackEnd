<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'upcoming_date_from',
        'upcoming_date_to',
        'upcoming_location',
        'upcoming_state',
        'upcoming_country',
        'instagram_link',
        'facebook_link',
        'twitter_link',
        'youtube_link',
        'apple_link',
        'amazon_link',
    ];
}

