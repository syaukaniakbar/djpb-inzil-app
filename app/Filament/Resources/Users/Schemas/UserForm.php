<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Support\Facades\Hash;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([

                // ── Foto Profil ────────────────────────────────────────────
                FileUpload::make('profile_photo')
                    ->label('Foto Profil')
                    ->image()
                    ->maxSize(2048)
                    ->directory('profile-photos')
                    ->disk('public')
                    ->visibility('public')
                    ->imageEditor()
                    ->placeholder('Upload foto profil pengguna')
                    ->helperText('Maks. 2MB. Format: JPG, PNG, WEBP.')
                    ->columnSpanFull(),

                // ── Informasi Akun ─────────────────────────────────────────
                TextInput::make('name')
                    ->label('Nama Lengkap')
                    ->required()
                    ->placeholder('Masukkan nama lengkap')
                    ->columnSpan(1),

                TextInput::make('nip')
                    ->label('NIP (Nomor Induk Pegawai)')
                    ->placeholder('Masukkan NIP')
                    ->columnSpan(1),

                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required()
                    ->placeholder('contoh@email.com')
                    ->columnSpan(1),

                TextInput::make('phone')
                    ->label('Nomor Telepon')
                    ->tel()
                    ->placeholder('628xxxxxxxxxx')
                    ->helperText('Format internasional: 628xxxxxxxxxx')
                    ->columnSpan(1),

                // ── Informasi Organisasi ───────────────────────────────────
                Select::make('department_id')
                    ->label('Departemen')
                    ->options(Department::pluck('name', 'id')->toArray())
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih departemen')
                    ->columnSpan(1),

                Select::make('position_id')
                    ->label('Jabatan')
                    ->options(Position::pluck('name', 'id')->toArray())
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih jabatan')
                    ->columnSpan(1),

                DatePicker::make('birth_date')
                    ->label('Tanggal Lahir')
                    ->placeholder('Pilih tanggal lahir')
                    ->displayFormat('d M Y')
                    ->columnSpan(1),

                Select::make('role')
                    ->label('Role')
                    ->required()
                    ->options([
                        'user' => 'User',
                        'admin' => 'Admin',
                    ])
                    ->placeholder('Pilih role')
                    ->columnSpan(1),

                // ── Keamanan ───────────────────────────────────────────────
                TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->revealable()
                    ->placeholder('Masukkan password baru')
                    ->helperText(
                        fn(string $operation) => $operation === 'edit'
                        ? 'Kosongkan jika tidak ingin mengubah password.'
                        : null
                    )
                    ->required(fn(string $operation) => $operation === 'create')
                    ->dehydrated(fn($state) => filled($state))
                    ->dehydrateStateUsing(fn($state) => filled($state) ? Hash::make($state) : null)
                    ->columnSpanFull(),

            ]);
    }
}
