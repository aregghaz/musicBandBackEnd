<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RedirectController extends Controller
{
    public function handleRedirect()
    {
        if (auth()->check()) {
            return redirect()->route('admin.dashboard', ['locale' => 'en']);
        }
        return redirect()->route('login');
    }
}
