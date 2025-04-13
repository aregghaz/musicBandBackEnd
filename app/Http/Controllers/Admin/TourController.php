<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UpcomingTourSection;
use App\Models\Tour;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TourController extends Controller
{
    // Show the tours for a specific section
    public function show($upcomingTourSectionId)
    {
        $upcomingTourSection = UpcomingTourSection::findOrFail($upcomingTourSectionId);
        $tours = $upcomingTourSection->tours;

        return Inertia::render('Admin/Tours/Show', [
            'upcomingTourSection' => $upcomingTourSection,
            'tours' => $tours
        ]);
    }

    // Store or update the tour section and its tours
    public function store(Request $request, $upcomingTourSectionId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'tours' => 'array',
            'tours.*.pre_sale_start' => 'required|date',
            'tours.*.pre_sale_end' => 'required|date',
        ]);

        // Find the upcoming tour section
        $upcomingTourSection = UpcomingTourSection::findOrFail($upcomingTourSectionId);

        // Update the title
        $upcomingTourSection->title = $request->title;
        $upcomingTourSection->save();

        // Delete existing tours before adding new ones
        $upcomingTourSection->tours()->delete();

        // Add the new tours if provided
        if ($request->tours) {
            foreach ($request->tours as $tourData) {
                $upcomingTourSection->tours()->create([
                    'pre_sale_start' => $tourData['pre_sale_start'],
                    'pre_sale_end' => $tourData['pre_sale_end'],
                ]);
            }
        }

        // Redirect back to the show page for this section
        return redirect()->route('admin.upcoming-tour-sections.tours.show', $upcomingTourSectionId);
    }

    // Destroy a specific tour
    public function destroy($upcomingTourSectionId, $tourId)
    {
        $tour = Tour::findOrFail($tourId);
        $tour->delete();

        // Redirect back to the show page for this section
        return redirect()->route('admin.upcoming-tour-sections.tours.show', $upcomingTourSectionId);
    }
}


