<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BandMemberCollection;
use App\Models\BandMember;
use Illuminate\Http\Request;

class BandMemberApiController extends Controller
{
    /**
     * Get all band members.
     */
    public function index()
    {
        return new BandMemberCollection(BandMember::all());
    }
}
