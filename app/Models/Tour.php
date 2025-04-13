<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = ['upcoming_tour_section_id', 'pre_sale_start', 'pre_sale_end'];

    // Define the relationship with upcoming tour section
    public function upcomingTourSection()
    {
        return $this->belongsTo(UpcomingTourSection::class);
    }
}
