<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BorrowingRequest extends FormRequest
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
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'notes' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.inventory_id' => 'required|exists:inventories,id',
            'items.*.notes' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'start_at.required' => 'Tanggal mulai harus diisi.',
            'end_at.after_or_equal' => 'Tanggal selesai harus setelah atau sama dengan tanggal mulai.',
            'items.required' => 'Minimal satu barang harus dipilih.',
            'items.*.inventory_id.required' => 'Barang harus dipilih.',
            'items.*.inventory_id.exists' => 'Barang yang dipilih tidak ditemukan.',
        ];
    }
}
