<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeSection extends Model
{
    use HasFactory;

    protected $table = 'home_sections';

    protected $fillable = [
        'slider_section',
        'about_section',
        'album_section',
        'latest_album_section',
        'contacts_section',
        'tours_section',
        'concerts_section',
        'band_members_section',
        'gallery_section',
        'blogs_section',
    ];

    protected $casts = [
        'slider_section' => 'boolean',
        'about_section' => 'boolean',
        'album_section' => 'boolean',
        'latest_album_section' => 'boolean',
        'contacts_section' => 'boolean',
        'tours_section' => 'boolean',
        'concerts_section' => 'boolean',
        'band_members_section' => 'boolean',
        'gallery_section' => 'boolean',
        'blogs_section' => 'boolean',
    ];
}
