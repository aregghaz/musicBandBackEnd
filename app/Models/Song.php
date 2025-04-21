<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Song extends Model
{
    protected $fillable = ['latest_album_id', 'song_title', 'song_owner', 'song_lyrics', 'song_link'];

    public function latestAlbum()
    {
        return $this->belongsTo(LatestAlbum::class);
    }
}

