<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'event_mode' => 'required|string|max:255',
            'event_name' => 'required|string|max:255',
            'room_id' => 'required|exists:rooms,id',
            'admin_note' => 'nullable|string|max:500',
        ];
    }
}
