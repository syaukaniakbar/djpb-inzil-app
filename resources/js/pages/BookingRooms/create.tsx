import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, Home, MapPin, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

/* =======================
 * Interfaces (Tetap Sama)
 * ======================= */
interface Room {
    id: number;
    name: string;
    capacity: number;
}

interface BookingRoomFormData {
    start_at: string;
    end_at: string;
    event_mode: string;
    event_name: string;
    room_id: number | null;
    admin_note: string;
}

interface Props {
    rooms: Room[];
}

export default function BookingRoomCreate({ rooms }: Props) {
    const { data, setData, post, processing, errors } =
        useForm<BookingRoomFormData>({
            start_at: '',
            end_at: '',
            event_mode: '',
            event_name: '',
            room_id: null,
            admin_note: '',
        });

    const [availableRooms, setAvailableRooms] = useState<Room[]>(rooms);
    const [loadingRooms, setLoadingRooms] = useState(false);

    useEffect(() => {
        if (!data.start_at || !data.end_at) {
            setAvailableRooms(rooms);
            setData('room_id', null);
            return;
        }

        setLoadingRooms(true);

        const params = new URLSearchParams({
            start_at: data.start_at,
            end_at: data.end_at,
        });

        fetch(`/api/rooms/available-rooms?${params}`)
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    setAvailableRooms(result.rooms);

                    if (
                        data.room_id &&
                        !result.rooms.some((r: Room) => r.id === data.room_id)
                    ) {
                        setData('room_id', null);
                    }
                } else {
                    setAvailableRooms(rooms);
                }
            })
            .catch(() => {
                setAvailableRooms(rooms);
            })
            .finally(() => setLoadingRooms(false));
    }, [data.start_at, data.end_at]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/booking-rooms/store');
    };

    return (
        <AppLayout>
            <Head title="Peminjaman Ruangan" />

            <div className="min-h-screen bg-[#f8fafc] px-3 py-6 md:px-6 md:py-12">
                <div className="mx-auto max-w-4xl">
                    {/* Back Button - Dibuat lebih lebar target kliknya untuk mobile */}
                    <a
                        href="/booking-rooms"
                        className="mb-6 inline-flex items-center p-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Kembali ke Daftar
                    </a>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 md:rounded-2xl">
                        {/* Header Section - Ukuran teks responsif */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Form Peminjaman Ruangan
                            </h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Lengkapi detail di bawah untuk pengajuan
                                peminjaman ruangan.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-8 md:p-10"
                        >
                            <div className="space-y-8 md:space-y-12">
                                {/* Section 1: Waktu */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-balance text-gray-800">
                                            Periode Peminjaman
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Tanggal & Waktu Mulai
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={data.start_at}
                                                onChange={(e) =>
                                                    setData(
                                                        'start_at',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${errors.start_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.start_at && (
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.start_at}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Tanggal & Waktu Selesai
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={data.end_at}
                                                onChange={(e) =>
                                                    setData(
                                                        'end_at',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${errors.end_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.end_at && (
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.end_at}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Ruangan */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3">
                                        <Home className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800">
                                            Ruangan
                                        </h2>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">
                                            Pilih Ruangan Tersedia
                                        </label>
                                        <select
                                            value={data.room_id ?? ''}
                                            onChange={(e) =>
                                                setData(
                                                    'room_id',
                                                    e.target.value
                                                        ? Number(e.target.value)
                                                        : null,
                                                )
                                            }
                                            className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${errors.room_id ? 'border-red-500' : ''}`}
                                            required
                                            disabled={loadingRooms}
                                        >
                                            <option value="">
                                                {loadingRooms ? 'Memuat ruangan...' : 'Pilih Ruangan...'}
                                            </option>
                                            {availableRooms.map((room) => (
                                                <option
                                                    key={room.id}
                                                    value={room.id}
                                                >
                                                    {room.name} — Kapasitas:{' '}
                                                    {room.capacity} orang
                                                </option>
                                            ))}
                                        </select>
                                        {loadingRooms && (
                                            <p className="mt-1 text-xs font-medium text-blue-500">
                                                Memeriksa ketersediaan ruangan...
                                            </p>
                                        )}
                                        {errors.room_id && (
                                            <p className="mt-1 text-xs font-medium text-red-500">
                                                {errors.room_id}
                                            </p>
                                        )}
                                    </div>
                                </section>

                                {/* Section 3: Detail Acara */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3">
                                        <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800">
                                            Detail Acara
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Jenis Acara
                                            </label>
                                            <select
                                                value={data.event_mode}
                                                onChange={(e) =>
                                                    setData(
                                                        'event_mode',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                required
                                            >
                                                <option value="">
                                                    Pilih Jenis Acara
                                                </option>
                                                <option value="offline">
                                                    Offline
                                                </option>
                                                <option value="online">
                                                    Online
                                                </option>
                                                <option value="hybrid">
                                                    Hybrid
                                                </option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Nama Acara
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Rapat Bulanan Divisi IT"
                                                value={data.event_name}
                                                onChange={(e) =>
                                                    setData(
                                                        'event_name',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                required
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Action Buttons - Dioptimalkan untuk Mobile (Stack vertical di HP) */}
                            <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 md:mt-14 md:flex-row md:items-center md:justify-end md:gap-4">
                                <a
                                    href="/booking-rooms"
                                    className="order-2 flex h-12 items-center justify-center px-6 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-700 md:order-1"
                                >
                                    Batalkan Pengajuan
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="order-1 flex h-12 items-center justify-center rounded-xl bg-blue-600 px-10 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] disabled:opacity-70 md:order-2 md:h-14"
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="mr-2 h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            Ajukan Peminjaman
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
