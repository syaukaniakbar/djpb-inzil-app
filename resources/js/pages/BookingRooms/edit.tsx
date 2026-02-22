import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Calendar, MapPin, Send, Home, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { BookingRoomFormData, BookingRoomEditProps } from '@/types/booking-room';
import type { AvailableRoom } from '@/types/room';

const formatDateTimeLocal = (dt: string | null): string => {
    if (!dt) return '';
    const d = new Date(dt);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function BookingRoomEdit({ booking }: BookingRoomEditProps) {
    const { data, setData, put, processing, errors } = useForm<BookingRoomFormData>({
        start_at: formatDateTimeLocal(booking.start_at),
        end_at: formatDateTimeLocal(booking.end_at ?? null),
        event_mode: booking.event_mode || '',
        event_name: booking.event_name || '',
        room_id: booking.room.id,
        admin_note: booking.admin_note || '',
    });

    const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
    const [loadingRooms, setLoadingRooms] = useState(false);

    const datesReady = !!data.start_at && !!data.end_at;

    useEffect(() => {
        if (!datesReady) {
            setAvailableRooms([]);
            return;
        }

        setLoadingRooms(true);

        const params = new URLSearchParams({
            start_at: data.start_at,
            end_at: data.end_at,
        });

        fetch(`/api/rooms/available-rooms?${params}`)
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setAvailableRooms(result.rooms);
                }
            })
            .catch(() => setAvailableRooms([]))
            .finally(() => setLoadingRooms(false));
    }, [data.start_at, data.end_at]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/booking-rooms/${booking.id}`);
    };

    // The currently booked room may be absent from the results if it's the same booking
    // We add it manually so it's always selectable.
    const roomsToShow = availableRooms.some((r) => r.id === booking.room.id)
        ? availableRooms
        : datesReady
            ? [booking.room, ...availableRooms]
            : [];

    return (
        <AppLayout>
            <Head title="Edit Peminjaman Ruangan" />

            <div className="min-h-screen bg-[#f8fafc] px-3 py-6 md:px-6 md:py-12 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">
                    <a
                        href="/booking-rooms"
                        className="mb-6 inline-flex items-center p-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar
                    </a>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 md:rounded-2xl dark:border-gray-800 dark:bg-gray-900">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Edit Form Peminjaman Ruangan</h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Silakan edit form berikut untuk memperbarui peminjaman ruangan.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-10">
                            <div className="space-y-8 md:space-y-12">

                                {/* Section 1: Periode */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Periode Peminjaman</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tanggal &amp; Waktu Mulai</label>
                                            <input
                                                type="datetime-local"
                                                value={data.start_at}
                                                onChange={(e) => setData('start_at', e.target.value)}
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${errors.start_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.start_at && <p className="mt-1 text-xs font-medium text-red-500">{errors.start_at}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tanggal &amp; Waktu Selesai</label>
                                            <input
                                                type="datetime-local"
                                                value={data.end_at}
                                                onChange={(e) => setData('end_at', e.target.value)}
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${errors.end_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                            />
                                            {errors.end_at && <p className="mt-1 text-xs font-medium text-red-500">{errors.end_at}</p>}
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Ruangan */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <Home className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Ruangan</h2>
                                    </div>

                                    {!datesReady && (
                                        <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                                            Isi tanggal peminjaman &amp; pengembalian terlebih dahulu untuk memuat daftar ruangan tersedia.
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pilih Ruangan Tersedia</label>
                                        <div className="relative">
                                            <select
                                                value={data.room_id ?? ''}
                                                onChange={(e) => setData('room_id', e.target.value ? Number(e.target.value) : null)}
                                                disabled={!datesReady || loadingRooms}
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${errors.room_id ? 'border-red-500' : ''}`}
                                                required
                                            >
                                                <option value="">
                                                    {!datesReady
                                                        ? 'Isi tanggal dulu...'
                                                        : loadingRooms
                                                            ? 'Memeriksa ketersediaan ruangan...'
                                                            : roomsToShow.length === 0
                                                                ? 'Tidak ada ruangan tersedia'
                                                                : 'Pilih Ruangan...'}
                                                </option>
                                                {roomsToShow.map((room) => (
                                                    <option key={room.id} value={room.id}>
                                                        {room.name} — Kapasitas: {room.capacity} orang
                                                    </option>
                                                ))}
                                            </select>
                                            {loadingRooms && (
                                                <Loader2 className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 animate-spin text-blue-500" />
                                            )}
                                        </div>
                                        {datesReady && !loadingRooms && data.room_id && (
                                            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">✓ Ruangan tersedia untuk periode ini</p>
                                        )}
                                        {errors.room_id && <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">{errors.room_id}</p>}
                                    </div>
                                </section>

                                {/* Section 3: Detail Acara */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Detail Acara</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Jenis Acara</label>
                                            <select
                                                value={data.event_mode}
                                                onChange={(e) => setData('event_mode', e.target.value)}
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                required
                                            >
                                                <option value="">Pilih Jenis Acara</option>
                                                <option value="offline">Offline</option>
                                                <option value="online">Online</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nama Acara</label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Rapat Bulanan Divisi IT"
                                                value={data.event_name}
                                                onChange={(e) => setData('event_name', e.target.value)}
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Catatan Admin (Opsional)</label>
                                        <textarea
                                            placeholder="Tambahkan catatan tambahan jika diperlukan..."
                                            value={data.admin_note}
                                            onChange={(e) => setData('admin_note', e.target.value)}
                                            className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            rows={3}
                                        />
                                    </div>
                                </section>
                            </div>

                            {/* Actions */}
                            <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 md:mt-14 md:flex-row md:items-center md:justify-end md:gap-4 dark:border-gray-800">
                                <a
                                    href="/booking-rooms"
                                    className="order-2 flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 md:order-1"
                                >
                                    Batalkan Pengajuan
                                </a>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm('Apakah Anda yakin ingin menghapus peminjaman ruangan ini?')) {
                                            router.delete(`/booking-rooms/${booking.id}`);
                                        }
                                    }}
                                    className="order-3 flex h-12 items-center justify-center rounded-xl bg-red-600 px-6 font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:shadow-red-300 active:scale-[0.98] md:order-3"
                                >
                                    Hapus
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="order-1 flex h-12 items-center justify-center rounded-xl bg-blue-600 px-10 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] disabled:opacity-70 md:order-2 md:h-14"
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            Perbarui Peminjaman
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
