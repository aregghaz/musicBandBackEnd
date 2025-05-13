<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concert extends Model
{
    use HasFactory;

    protected $fillable = [
        'concert_city',
        'concert_place',
        'concert_date',
        'type',
        'concert_image',
        'buy_ticket_link',
    ];

    protected $dates = [
        'concert_date',
    ];
}
