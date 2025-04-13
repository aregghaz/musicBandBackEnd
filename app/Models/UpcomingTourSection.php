<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpcomingTourSection extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function tours()
    {
        return $this->hasMany(Tour::class);
    }
}
