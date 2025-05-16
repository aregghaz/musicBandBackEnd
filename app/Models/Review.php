<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';

    protected $fillable = [
        'reviewer_name',
        'reviewer_description',
        'review_hide',
    ];

    protected $casts = [
        'review_hide' => 'boolean',
    ];
}
