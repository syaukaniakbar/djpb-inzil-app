<?php

namespace App\Filament\Resources\Borrowings\Actions;

use App\Models\Borrowing;
use Filament\Actions\Action;
use Illuminate\Support\HtmlString;

class WhatsAppNotificationAction extends Action
{
    public static function make(?string $name = 'whatsapp_notification'): static
    {
        return parent::make($name)
            ->label('Notifikasi WhatsApp')
            ->icon('heroicon-o-chat-bubble-bottom-center-text')
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Kirim Notifikasi WhatsApp')
            ->modalDescription(new HtmlString('<p>Apakah Anda yakin ingin mengirim notifikasi WhatsApp kepada pengguna?</p>'))
            ->modalSubmitActionLabel('Kirim')
            ->modalCancelActionLabel('Batal')
            ->visible(function (Borrowing $record) {
                // Show the button only if status is ongoing and end_at has passed
                return $record->status === 'ongoing' && $record->end_at && now()->gt($record->end_at);
            })
            ->action(function (Borrowing $record) {
                // Generate WhatsApp URL with the user's phone number and a custom message
                $phoneNumber = $record->user->phone;
                if (!$phoneNumber) {
                    throw new \Exception('Nomor telepon pengguna tidak ditemukan.');
                }

                $message = urlencode("DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Notifikasi Peminjaman Aset]\n\nID Peminjaman: #{$record->id}\nNama: {$record->user->name}\nAset: " . $record->borrowingDetails->pluck('inventory.name')->join(', ') . "\nTanggal Peminjaman: {$record->start_at->format('d/m/Y H:i')}\nTanggal Pengembalian: {$record->end_at->format('d/m/Y H:i')}\n\nMohon segera dikembalikan karena telah melewati batas waktu pengembalian.");

                $whatsappUrl = "https://wa.me/{$phoneNumber}?text={$message}";

                // Open the WhatsApp URL in a new tab/window
                return redirect()->away($whatsappUrl);
            });
    }
}