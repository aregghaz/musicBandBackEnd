<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Concert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Helpers\ImageUploadHelper;

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

        $concert = new Concert();
        $concert->fill($validatedData);

        ImageUploadHelper::handleImageUpload(
            $request,
            $concert,
            'concert_image',
            'remove_image',
            'concert_image',
            'concerts'
        );

        $concert->save();

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

        $concert->fill($validatedData);

        ImageUploadHelper::handleImageUpload(
            $request,
            $concert,
            'concert_image',
            'remove_image',
            'concert_image',
            'concerts',
        );

        $concert->save();

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
