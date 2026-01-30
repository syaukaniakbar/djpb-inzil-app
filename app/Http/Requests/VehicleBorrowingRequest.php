<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleBorrowingRequest extends FormRequest
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
            'purpose' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'vehicle_id' => 'required|exists:vehicles,id',
            'admin_note' => 'nullable|string|max:500',
        ];
    }
}
