<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Concert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'concert_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'buy_ticket_link' => 'nullable|url',
        ]);

        if ($request->hasFile('concert_image')) {
            $path = $request->file('concert_image')->store('concerts', 'public');
            $validatedData['concert_image'] = '/storage/' . $path;
        }

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
            'concert_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'buy_ticket_link' => 'nullable|url',
        ]);

        if ($request->hasFile('concert_image')) {
            // Delete old image if it exists
            if ($concert->concert_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $concert->concert_image));
            }
            // Store new image
            $path = $request->file('concert_image')->store('concerts', 'public');
            $validatedData['concert_image'] = '/storage/' . $path;
        } elseif ($request->boolean('remove_image')) {
            // Remove existing image if requested
            if ($concert->concert_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $concert->concert_image));
            }
            $validatedData['concert_image'] = null;
        }

        $concert->update($validatedData);

        return redirect()->route('concerts.index')->with('success', 'Concert updated successfully.');
    }

    public function destroy(Concert $concert)
    {
        if ($concert->concert_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $concert->concert_image));
        }

        $concert->delete();

        return redirect()->route('concerts.index')->with('success', 'Concert deleted successfully.');
    }
}
