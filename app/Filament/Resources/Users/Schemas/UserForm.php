<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Support\Facades\Hash; 


class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('profile_photo')
                    ->label('Foto Profil')
                    ->image()
                    ->maxSize(2048)
                    ->directory('profile-photos')
                    ->disk('public')
                    ->visibility('public')
                    ->imageEditor()
                    ->placeholder('Upload foto profil pengguna'),
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
                    ->revealable()
                    ->label('Password')
                    ->required(fn (string $context) => $context === 'create')
                    ->dehydrated(fn ($state) => filled($state))
                    ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null),
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
