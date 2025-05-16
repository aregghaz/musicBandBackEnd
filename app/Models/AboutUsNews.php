<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUsNews extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'topicLink',
    ];
}
