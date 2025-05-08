<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_id',
        'latest_album_id',
        'song_title',
        'song_owner',
        'song_lyrics',
        'song_link',
    ];

    public function album()
    {
        return $this->belongsTo(Album::class, 'album_id');
    }

    public function latestAlbum()
    {
        return $this->belongsTo(LatestAlbum::class, 'latest_album_id');
    }
}
