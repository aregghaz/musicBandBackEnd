<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BandMember extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'role',
        'band_member_image'
    ];
}
