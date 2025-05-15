<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    use HasFactory;

    protected $fillable = [
        'slider_title',
        'slider_short_description',
        'slider_video_link',
        'slider_image',
        'slider_image_mob',
        'slider_title_color',
        'slider_title_size',
        'slider_short_desc_color',
        'slider_short_desc_size',
        'slider_title_size_mobile',
        'slider_short_desc_size_mobile',
    ];
}
