<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = [
        'album_name',
        'album_label',
        'released_date',
        'album_genre',
        'album_styles',
        'album_image',
        'apple_link',
        'amazon_link',
        'spotify_link',
        'youtube_link',
    ];

    public function songs()
    {
        return $this->hasMany(Song::class, 'album_id');
    }
}
