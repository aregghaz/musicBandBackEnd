<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BandMember;
use Illuminate\Http\Request;
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

        $data = $request->only(['first_name', 'last_name', 'role']);

        // ✅ handle image upload on update if new file provided
        if ($request->hasFile('band_member_image')) {
            $path = $request->file('band_member_image')->store('band_members', 'public');
            $data['band_member_image'] = '/storage/' . $path;
        }

        $bandMember->update($data);

        return redirect()->route('band-members.index');
    }

    public function destroy(BandMember $bandMember)
    {
        $bandMember->delete();
        return redirect()->route('band-members.index');
    }
}
