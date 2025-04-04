<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConcertRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'concert_city' => 'required|string',
            'concert_place' => 'required|string',
            'concert_date' => 'required|date',
            'type' => 'required|string',
            'concert_image' => 'required|string',
        ];
    }
}
