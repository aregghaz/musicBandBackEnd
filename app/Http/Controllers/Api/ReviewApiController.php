<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewCollection;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class ReviewApiController extends Controller
{
    public function index()
    {
        return new ReviewCollection(Review::where('review_hide', false)->get());
    }

    public function show($id)
    {
        $review = Review::where('review_hide', false)->find($id);

        if (!$review) {
            return response()->json(['error' => 'Review not found'], 404);
        }

        return new ReviewResource($review);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'reviewerName' => 'required|string|max:255',
                'reviewerDescription' => 'required|string',
            ]);

            if ($validator->fails()) {
                throw new Exception('Validation failed: ' . $validator->errors()->first());
            }

            $review = Review::create([
                'reviewer_name' => $request->reviewerName,
                'reviewer_description' => $request->reviewerDescription,
                'review_hide' => false, // As per your provided code
            ]);

            return response()->json(new ReviewResource($review), 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create review'], 500);
        }
    }
}
