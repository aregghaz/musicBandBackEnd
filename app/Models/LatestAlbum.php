<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LatestAlbum extends Model
{
    protected $fillable = [
        'album_title', 'album_label', 'album_released', 'album_genre', 'album_styles',
        'album_image', 'album_amazon_link', 'album_apple_link', 'album_youtube_link', 'album_spotify_link'
    ];

    public function songs()
    {
        return $this->hasMany(Song::class);
    }
}


