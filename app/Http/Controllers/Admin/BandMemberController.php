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
            'band_member_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = $request->only(['first_name', 'last_name', 'role']);

        // ✅ handle image upload
        if ($request->hasFile('band_member_image')) {
            $path = $request->file('band_member_image')->store('band_members', 'public');
            $data['band_member_image'] = '/storage/' . $path;
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
            'band_member_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);



        $bandMember->first_name = $request->first_name;
        $bandMember->last_name = $request->last_name;
        $bandMember->role = $request->role;

//        if ($request->hasFile('band_member_image')) {
//            $path = $request->file('band_member_image')->store('band_members', 'public');
//            $data['band_member_image'] = '/storage/' . $path;
//        }


        if ($request->hasFile('band_member_image')) {

            if ($bandMember->band_member_image) {
                $oldPath = str_replace('/storage/', '', $bandMember->band_member_image);
                Storage::disk('public')->delete($oldPath);
            }


            $path = $request->file('band_member_image')->store('band_members', 'public');
            $bandMember['band_member_image'] = '/storage/' . $path;
        }

        elseif (!$request->input('band_member_image')  && $bandMember['band_member_image']) {
            // Delete the old image
            $oldPath = str_replace('/storage/', '', $bandMember['band_member_image']);
            Storage::disk('public')->delete($oldPath);
            $bandMember['band_member_image'] = null;
        }

        $bandMember->save();

        return redirect()->route('band-members.index');
    }

    public function destroy(BandMember $bandMember)
    {
        $bandMember->delete();
        return redirect()->route('band-members.index');
    }
}
