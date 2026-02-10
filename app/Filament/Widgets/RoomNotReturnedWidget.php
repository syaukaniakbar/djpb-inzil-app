<?php

namespace App\Filament\Widgets;

use App\Models\BookingRoom;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Filament\Tables\Columns\TextColumn;

class RoomNotReturnedWidget extends BaseWidget
{
    protected int|string|array $columnSpan = 'full';
    protected string $title = '';
    protected static ?int $sort = 2;

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->heading('Peminjam ruangan yang sedang berlangsung')
            ->description('Daftar peminjam dengan ruangan yang sedang berlangsung')
            ->query(
                BookingRoom::query()->active()
            )
            ->columns([
                TextColumn::make('user.department.code')
                    ->label('Departemen')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('room.name')
                    ->label('Ruangan')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('start_at')
                    ->label('Tanggal Peminjaman')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('end_at')
                    ->label('Tanggal Pengembalian')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('event_mode')
                    ->label('Jenis Acara')
                    ->formatStateUsing(
                        fn($state) =>
                        match ($state) {
                            'meeting' => 'Meeting',
                            'presentation' => 'Presentasi',
                            'training' => 'Training',
                            'interview' => 'Interview',
                            'other' => 'Lainnya',
                            default => $state
                        }
                    )
                    ->badge()
                    ->sortable(),
                TextColumn::make('event_name')
                    ->label('Nama Acara')
                    ->searchable()
                    ->limit(30),

            ]);
    }
}
