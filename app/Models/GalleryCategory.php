<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryCategory extends Model
{
    protected $fillable = ['folder_name', 'gallery_category_image'];

    public function galleries()
    {
        return $this->hasMany(Gallery::class, 'gallery_category_id');
    }
}
