<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConcertCollection;  // Import the resource collection
use App\Models\Concert;

class ConcertApiController extends Controller
{
    // Get concerts by type
    public function getConcertsByType($type)
    {
        // Get concerts filtered by type
        $concerts = Concert::where('type', $type)->get();

        // Return the concerts using the ConcertCollection
        return new ConcertCollection($concerts);
    }
}
