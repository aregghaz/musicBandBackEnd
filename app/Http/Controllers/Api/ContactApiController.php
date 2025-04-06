<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Http\Resources\ContactCollection;


class ContactApiController extends Controller
{
    public function index()
    {
        $types = ['Booking', 'Press', 'Info'];

        $contacts = Contact::whereIn('type', $types)
            ->orderByRaw("FIELD(type, 'Booking', 'Press', 'Info')")
            ->get();

        return new ContactCollection($contacts);
    }
}
