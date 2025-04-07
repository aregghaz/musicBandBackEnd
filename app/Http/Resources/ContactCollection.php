<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ContactCollection extends ResourceCollection
{
    /**
     * Transform the contact data into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($contact) {
            return [
                'type' => $contact->type,
                'name' => $contact->name,
                'surname' => $contact->surname,
                'phone' => $contact->phone,
                'email' => $contact->email,
            ];
        })->toArray();
    }
}
