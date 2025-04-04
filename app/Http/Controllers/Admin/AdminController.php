<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard'); // Make sure this page exists in `resources/js/Pages/Admin/`
    }
}
