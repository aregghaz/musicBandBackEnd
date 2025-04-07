<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Show the form with all sections (Booking, Press, Info)
    public function showForm()
    {
        // Fetch the contact information for Booking, Press, and Info
        $contacts = Contact::whereIn('type', ['Booking', 'Press', 'Info'])->get()->keyBy('type');

        return inertia('Admin/Contacts/Manage', [
            'contacts' => $contacts
        ]);
    }

    // Store or update contact info based on section type
    public function storeOrUpdate(Request $request)
    {
        // Validate data from the form (optional validation, you can adjust)
        // Validate the cleaned data
        $cleaned = collect($request->all())->map(function ($value) {
            return $value === '' ? null : $value;
        })->toArray();

        $data = validator($cleaned, [
            'name' => 'nullable|string',
            'surname' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'type' => 'required|in:Booking,Press,Info',
        ])->validate();

        // Update or create contact based on type
        Contact::updateOrCreate(
            ['type' => $data['type']],
            [
                'name' => $data['name'] ?? '',
                'surname' => $data['surname'] ?? '',
                'phone' => $data['phone'] ?? '',
                'email' => $data['email'] ?? '',
            ]
        );

        return redirect()->route('contacts.showForm')->with('message', 'Contact saved successfully!');
    }
}






