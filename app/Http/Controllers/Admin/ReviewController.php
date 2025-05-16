<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::latest()->get();

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Reviews/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'reviewer_name' => 'required|string|max:255',
            'reviewer_description' => 'required|string',
            'review_hide' => 'required|boolean',
        ]);

        Review::create($validatedData);

        return redirect()->route('reviews.index')->with('success', 'Review created successfully.');
    }

    public function show($id)
    {
        return redirect()->route('reviews.index');
    }

    public function edit($id)
    {
        $review = Review::findOrFail($id);

        return Inertia::render('Admin/Reviews/Edit', [
            'review' => $review,
        ]);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validatedData = $request->validate([
            'reviewer_name' => 'required|string|max:255',
            'reviewer_description' => 'required|string',
            'review_hide' => 'required|boolean',
        ]);

        $review->update($validatedData);

        return redirect()->route('reviews.index')->with('success', 'Review updated successfully.');
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return redirect()->route('reviews.index')->with('success', 'Review deleted successfully.');
    }
}
