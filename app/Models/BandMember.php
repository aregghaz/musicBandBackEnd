<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BandMember extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'role',
        'band_member_image',
        'band_member_images',
        'country',
        'description',
        'facebook_link',
        'instagram_link',
        'wikipedia_link',
        'webpage_link',
        'youtube_link',
        'spotify_link',
        'apple_music_link',
        'tiktok_link',
        'is_active',
        'order',
        'is_head',
    ];

    protected $casts = [
        'band_member_images' => 'array',
        'is_active' => 'boolean',
        'is_head' => 'boolean',
    ];

    public function images()
    {
        return $this->hasMany(BandMemberImage::class);
    }
}
