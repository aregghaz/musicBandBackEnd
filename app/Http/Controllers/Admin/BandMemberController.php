<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BandMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BandMemberController extends Controller
{
    public function index()
    {
        $bandMembers = BandMember::all();
        return Inertia::render('Admin/BandMembers/Index', ['bandMembers' => $bandMembers]);
    }

    public function create()
    {
        return Inertia::render('Admin/BandMembers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'role' => 'required|string',
            'country' => 'nullable|string',
            'description' => 'nullable|string',
            'facebook_link' => 'nullable|url',
            'instagram_link' => 'nullable|url',
            'wikipedia_link' => 'nullable|url',
            'webpage_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
            'is_active' => 'nullable|boolean',
            'band_member_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'band_member_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = $request->only([
            'first_name', 'last_name', 'role',
            'country', 'description',
            'facebook_link', 'instagram_link', 'wikipedia_link', 'webpage_link', 'youtube_link',
        ]);

        $data['is_active'] = $request->boolean('is_active', false);

        // Single image
        if ($request->hasFile('band_member_image')) {
            $path = $request->file('band_member_image')->store('band_members', 'public');
            $data['band_member_image'] = '/storage/' . $path;
        }

        // Multiple images
        $multipleImages = [];
        if ($request->hasFile('band_member_images')) {
            foreach ($request->file('band_member_images') as $image) {
                $path = $image->store('band_members/gallery', 'public');
                $multipleImages[] = '/storage/' . $path;
            }
            $data['band_member_images'] = $multipleImages;
        }

        BandMember::create($data);

        return redirect()->route('band-members.index');
    }

    public function edit(BandMember $bandMember)
    {
        return Inertia::render('Admin/BandMembers/Edit', ['bandMember' => $bandMember]);
    }

    public function update(Request $request, BandMember $bandMember)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'role' => 'required|string',
            'country' => 'nullable|string',
            'description' => 'nullable|string',
            'facebook_link' => 'nullable|url',
            'instagram_link' => 'nullable|url',
            'wikipedia_link' => 'nullable|url',
            'webpage_link' => 'nullable|url',
            'youtube_link' => 'nullable|url',
            'is_active' => 'nullable|boolean',
            'band_member_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'band_member_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'image_paths' => 'nullable|array',
        ]);

        $bandMember->fill($request->only([
            'first_name', 'last_name', 'role',
            'country', 'description',
            'facebook_link', 'instagram_link',
            'wikipedia_link', 'webpage_link', 'youtube_link',
        ]));

        $bandMember->is_active = $request->boolean('is_active', false);

        // Update single image
        if ($request->hasFile('band_member_image')) {
            if ($bandMember->band_member_image) {
                $oldPath = str_replace('/storage/', '', $bandMember->band_member_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('band_member_image')->store('band_members', 'public');
            $bandMember->band_member_image = '/storage/' . $path;
        } elseif ($request->boolean('remove_image')) {
            if ($bandMember->band_member_image) {
                $oldPath = str_replace('/storage/', '', $bandMember->band_member_image);
                Storage::disk('public')->delete($oldPath);
                $bandMember->band_member_image = null;
            }
        }

        // Handle gallery images
        $existingImages = $bandMember->band_member_images ?? [];
        $newImagePaths = array_filter($request->image_paths ?? [], fn($path) => !str_starts_with($path, 'blob:'));

        // Upload new images and append their paths
        if ($request->hasFile('band_member_images')) {
            foreach ($request->file('band_member_images') as $image) {
                $path = $image->store('band_members/gallery', 'public');
                $newImagePaths[] = '/storage/' . $path;
            }
        }

        // Delete images not in newImagePaths
        foreach ($existingImages as $existingImage) {
            if (!in_array($existingImage, $newImagePaths)) {
                $cleanPath = str_replace('/storage/', '', $existingImage);
                Storage::disk('public')->delete($cleanPath);
            }
        }

        // Update band_member_images with newImagePaths
        $bandMember->band_member_images = array_values($newImagePaths);

        $bandMember->save();

        return redirect()->route('band-members.index')->with('success', 'Band member updated successfully.');
    }

    public function destroy(BandMember $bandMember)
    {
        if ($bandMember->band_member_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $bandMember->band_member_image));
        }

        if ($bandMember->band_member_images && is_array($bandMember->band_member_images)) {
            foreach ($bandMember->band_member_images as $image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image));
            }
        }

        $bandMember->delete();

        return redirect()->route('band-members.index');
    }
}
