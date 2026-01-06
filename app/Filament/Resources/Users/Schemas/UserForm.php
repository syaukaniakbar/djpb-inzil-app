<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use App\Models\Department;
use App\Models\Position;


class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama')
                    ->required(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
                TextInput::make('nip')
                    ->label('NIP')
                    ->required(),
                TextInput::make('password')
                    ->password()
                    ->revealable(),
                Select::make('role')
                    ->label('Role')
                    ->required()
                    ->options([
                        'user' => 'User',
                        'admin' => 'Admin',
                    ]),
                DateTimePicker::make('birth_date')
                    ->label('Tanggal Lahir')
                    ->required(),
                Select::make('position_id')
                    ->label('Jabatan')
                    ->required()
                    ->options(
                        Position::pluck('name', 'id')->toArray()
                    ),
                Select::make('department_id')
                    ->label('Departemen')
                    ->required()
                    ->options(
                        Department::pluck('name', 'id')->toArray()
                    ),
            ]);
    }
}
