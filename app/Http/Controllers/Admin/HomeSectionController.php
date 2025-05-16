<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeSectionController extends Controller
{
    /**
     * Display the manage home sections page.
     */
    public function index()
    {
        $homeSection = HomeSection::first();

        return Inertia::render('Admin/HomeSections/Manage', [
            'homeSection' => $homeSection,
        ]);
    }

    /**
     * Update the home sections settings.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'slider_section' => 'required|boolean',
            'about_section' => 'required|boolean',
            'album_section' => 'required|boolean',
            'latest_album_section' => 'required|boolean',
            'contacts_section' => 'required|boolean',
            'tours_section' => 'required|boolean',
            'concerts_section' => 'required|boolean',
            'band_members_section' => 'required|boolean',
            'gallery_section' => 'required|boolean',
            'blogs_section' => 'required|boolean',
            'about_us_news_section' => 'required|boolean',
            'reviews_section' => 'required|boolean',
        ]);

        $homeSection = HomeSection::first();
        if ($homeSection) {
            $homeSection->update($validatedData);
        } else {
            $homeSection = HomeSection::create($validatedData);
        }

        return redirect()->route('home-sections.index')->with('success', 'Home sections updated successfully.');
    }


    public function create()
    {
        return redirect()->route('home-sections.index');
    }

    public function store(Request $request)
    {
        return redirect()->route('home-sections.index');
    }

    public function show($id)
    {
        return redirect()->route('home-sections.index');
    }

    public function edit($id)
    {
        return redirect()->route('home-sections.index');
    }

    public function destroy($id)
    {
        return redirect()->route('home-sections.index');
    }
}
