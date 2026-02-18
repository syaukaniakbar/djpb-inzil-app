<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Schemas\Schema;

class UserInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                ImageEntry::make('profile_photo')
                    ->label('Foto Profil')
                    ->circular()
                    ->size(100)
                    ->placeholder('Belum ada foto profil'),
                TextEntry::make('nip')
                    ->label('Nomor Induk Pegawai')
                    ->placeholder('-'),
                TextEntry::make('name')
                    ->label('Nama'),
                TextEntry::make('email')
                    ->label('Email'),
                TextEntry::make('email_verified_at')
                    ->dateTime()
                    ->label('Email Terverifikasi')
                    ->placeholder('-'),
                TextEntry::make('role')
                    ->label('Role'),
                TextEntry::make('phone')
                    ->label('Nomor Telepon')
                    ->placeholder('-'),
                TextEntry::make('position.name')
                    ->label('Jabatan')
                    ->placeholder('-'),
                TextEntry::make('department.name')
                    ->label('Departemen')
                    ->placeholder('-'),
                TextEntry::make('two_factor_secret')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('two_factor_recovery_codes')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('two_factor_confirmed_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
