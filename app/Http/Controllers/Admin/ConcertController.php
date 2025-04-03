<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Concert;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConcertController extends Controller
{
    public function index()
    {
        $concerts = Concert::all();
        return Inertia::render('Admin/Concerts/Index', [
            'concerts' => $concerts
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Concerts/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'concert_city' => 'required|string',
            'concert_place' => 'required|string',
            'concert_date' => 'required|date',
            'type' => 'required|string',
             // TODO: temporary
            'concert_image' => 'nullable|string',
        ]);

        Concert::create($validatedData);

        return redirect()->route('concerts.index')->with('success', 'Concert created successfully.');
    }

    public function edit(Concert $concert)
    {
        return Inertia::render('Admin/Concerts/Edit', [
            'concert' => $concert
        ]);
    }

    public function update(Request $request, Concert $concert)
    {
        $validatedData = $request->validate([
            'concert_city' => 'sometimes|string',
            'concert_place' => 'sometimes|string',
            'concert_date' => 'sometimes|date',
            'type' => 'sometimes|string',
            // TODO: temporary
            'concert_image' => 'nullable|string',
        ]);

        $concert->update($validatedData);

        return redirect()->route('concerts.index')->with('success', 'Concert updated successfully.');
    }

    public function destroy(Concert $concert)
    {
        $concert->delete();

        return redirect()->route('concerts.index')->with('success', 'Concert deleted successfully.');
    }
}
