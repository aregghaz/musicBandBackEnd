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
        $bandMembers = BandMember::all(); // Get all band members
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
            // TODO: temporary
            'band_member_image' => 'nullable|string',
        ]);

        BandMember::create($request->all()); // Store the new band member
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
            // TODO: temporary
            'band_member_image' => 'nullable|string',
        ]);

        $bandMember->update($request->all()); // Update the band member
        return redirect()->route('band-members.index');
    }

    public function destroy(BandMember $bandMember)
    {
        $bandMember->delete(); // Delete the band member
        return redirect()->route('band-members.index');
    }
}


