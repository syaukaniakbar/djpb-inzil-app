<?php

namespace App\Filament\Resources\Borrowings\Schemas;

use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Hidden;

class BorrowingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('User')
                    ->relationship('user', 'name')
                    ->options(User::all()->pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required(),
                DateTimePicker::make('start_at')
                    ->label('Start Date & Time')
                    ->required(),
                DateTimePicker::make('end_at')
                    ->label('End Date & Time'),
                DateTimePicker::make('returned_at')
                    ->label('Returned Date & Time'),
                Textarea::make('notes')
                    ->label('Notes')
                    ->columnSpanFull(),
                Textarea::make('admin_note')
                    ->label('Admin Note')
                    ->columnSpanFull(),
                Hidden::make('status')
                    ->default(fn(?string $operation) => $operation === 'create' ? 'pending' : null)
            ]);
    }
}
