<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactCollection;
use App\Http\Resources\HomeSectionResource;
use App\Models\HomeSection;

class HomeSectionApiController extends Controller
{
    public function index()
    {

        $home_section = HomeSection::first();
        return new HomeSectionResource($home_section);
    }
}
