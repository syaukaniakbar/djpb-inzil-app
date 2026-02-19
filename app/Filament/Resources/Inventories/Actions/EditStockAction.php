<?php

namespace App\Filament\Resources\Inventories\Actions;

use Filament\Actions\Action;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Model;

class EditStockAction
{
    public static function make(): Action
    {
        return Action::make('edit_stock')
            ->label('Ubah Stok')
            ->icon('heroicon-o-arrow-path')
            ->color('warning')
            ->form([
                TextInput::make('quantity')
                    ->label('Jumlah Stok Baru')
                    ->numeric()
                    ->minValue(0)
                    ->required()
                    ->helperText('Masukkan jumlah stok baru untuk item ini'),
            ])
            ->action(function (Model $record, array $data) {
                $oldQuantity = $record->quantity;
                $newQuantity = (int) $data['quantity'];

                $record->update([
                    'quantity' => $newQuantity
                ]);

                Notification::make()
                    ->title('Stok Berhasil Diubah')
                    ->body("Stok berubah dari {$oldQuantity} menjadi {$newQuantity}")
                    ->success()
                    ->send();
            })
            ->modalHeading('Ubah Jumlah Stok')
            ->modalSubmitActionLabel('Simpan Perubahan');
    }
}
