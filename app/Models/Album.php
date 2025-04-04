<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_name',
        'album_image',
        'released_date',
        'apple_link',
        'amazon_link',
        'spotify_link',
        'youtube_link',
    ];
}
