<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UpcomingTourSection;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpcomingTourSectionController extends Controller
{
    public function index()
    {
        // Get the first section with its tours (single object, not an array)
        $section = UpcomingTourSection::with('tours')->first();

        return Inertia::render('Admin/UpcomingTours/Index', [
            'section' => $section // Returning a single section object
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'tours' => 'array',
            'tours.*.pre_sale_start' => 'required|date',
            'tours.*.pre_sale_end' => 'required|date',
        ]);

        // If no section exists, create a new one; otherwise, update the existing one
        $section = UpcomingTourSection::first() ?? new UpcomingTourSection();

        // Set the title and save the section
        $section->title = $request->title ?? '';
        $section->save();

        // Clean up existing tours for this section (if any)
        $section->tours()->delete();

        // Add the new tours from the request
        foreach ($request->tours as $tourData) {
            $section->tours()->create([
                'pre_sale_start' => $tourData['pre_sale_start'],
                'pre_sale_end' => $tourData['pre_sale_end'],
            ]);
        }

        // Return a success message
        return back()->with('success', 'Upcoming Tour Section updated successfully.');
    }
}

