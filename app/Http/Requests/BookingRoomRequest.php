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
            'room_id' => [
                'required',
                'exists:rooms,id',
                function ($attribute, $value, $fail) {
                    // Check if the room is available for the given time range
                    $startAt = $this->start_at;
                    $endAt = $this->end_at;

                    $existingBooking = \App\Models\BookingRoom::where('room_id', $value)
                        ->where(function ($query) use ($startAt, $endAt) {
                            $query->where('start_at', '<', $endAt)
                                  ->where('end_at', '>', $startAt);
                        })
                        ->whereIn('status', ['pending', 'approved', 'ongoing'])
                        ->first();

                    if ($existingBooking) {
                        $fail('Ruangan ini sudah dipesan untuk periode yang dipilih.');
                    }
                },
            ],
            'admin_note' => 'nullable|string|max:500',
        ];
    }
}
