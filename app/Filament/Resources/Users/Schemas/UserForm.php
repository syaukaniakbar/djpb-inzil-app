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
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('password')
                    ->password()
                    ->revealable()
                    ->required(),
                Select::make('role')
                    ->required()
                    ->options([
                        'user' => 'User',
                        'admin' => 'Admin',
                    ]),
                Select::make('position_id')
                    ->label('Position')
                    ->required()
                    ->options(
                        Position::pluck('name', 'id')->toArray()
                    ),
                Select::make('department_id') // atau 'bidang' sesuai kolom di database
                    ->label('Department')
                    ->required()
                    ->options(
                        Department::pluck('name', 'id')->toArray()
                    ),
            ]);
    }
}
