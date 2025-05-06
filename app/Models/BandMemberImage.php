<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BandMemberImage extends Model
{
    public function bandMember()
    {
        return $this->belongsTo(BandMember::class);
    }
}
