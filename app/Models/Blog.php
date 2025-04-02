<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image', 'translations' 
    ];

    protected $casts = [
        'translations' => 'array',
    ];

    /**
     * Get blog content for a specific locale.
     *
     * @param string $locale
     * @return array|null
     */
    public function getTranslation($locale)
    {
        // Return the translation for the given locale, or null if it doesn't exist
        $translations = $this->translations ?? [];
        return $translations[$locale] ?? null;
    }
}

