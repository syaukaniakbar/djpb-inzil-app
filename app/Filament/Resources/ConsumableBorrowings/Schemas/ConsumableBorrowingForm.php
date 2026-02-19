<?php

namespace App\Filament\Resources\ConsumableBorrowings\Schemas;

use App\Models\User;
use App\Models\ConsumableItem;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ConsumableBorrowingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Pengguna')
                    ->relationship('user', 'name')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('consumable_item_id')
                    ->label('Persediaan')
                    ->relationship('consumableItem', 'name')
                    ->options(ConsumableItem::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),
                TextInput::make('quantity')
                    ->label('Jumlah')
                    ->numeric()
                    ->minValue(1)
                    ->required()
                    ->default(1),
                DateTimePicker::make('borrowed_at')
                    ->label('Tanggal Pengambilan')
                    ->required()
                    ->default(now()),
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'finished' => 'Finished',
                        'rejected' => 'Rejected',
                        'canceled' => 'Canceled',
                    ])
                    ->default('pending')
                    ->required(),
                Textarea::make('notes')
                    ->label('Catatan')
                    ->columnSpanFull(),
            ]);
    }
}
