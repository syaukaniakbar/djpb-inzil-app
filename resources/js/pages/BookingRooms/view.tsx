import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Home,
    Info,
    MapPin,
    User,
    XCircle,
} from 'lucide-react';
import { JSX } from 'react';

interface Room {
    id: number;
    name: string;
    capacity: number;
}

interface User {
    id: number;
    name: string;
}

interface BookingRoom {
    id: number;
    start_at: string;
    end_at: string;
    event_mode: string;
    event_name: string;
    status: string;
    admin_note: string | null;
    user: User;
    room: Room;
}

const statusConfig: Record<
    BookingRoom['status'],
    { label: string; className: string; icon: JSX.Element }
> = {
    pending: {
        label: 'Pending',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <AlertCircle className="h-4 w-4" />,
    },
    approved: {
        label: 'Disetujui',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <CheckCircle className="h-4 w-4" />,
    },
    ongoing: {
        label: 'Sedang Berlangsung',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <Clock className="h-4 w-4" />,
    },
    used: {
        label: 'Telah Digunakan',
        className: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: <CheckCircle className="h-4 w-4" />,
    },
    finished: {
        label: 'Selesai',
        className: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className="h-4 w-4" />,
    },
    rejected: {
        label: 'Ditolak',
        className: 'bg-red-100 text-red-700 border-red-200',
        icon: <XCircle className="h-4 w-4" />,
    },
    canceled: {
        label: 'Dibatalkan',
        className: 'bg-slate-100 text-slate-600 border-slate-200',
        icon: <XCircle className="h-4 w-4" />,
    },
};

const eventModeLabels: Record<string, string> = {
    meeting: 'Meeting',
    presentation: 'Presentasi',
    training: 'Training',
    interview: 'Interview',
    other: 'Lainnya',
};

interface Props {
    booking: BookingRoom;
}

export default function View({ booking }: Props) {
    return (
        <AppLayout>
            <Head title={`Lihat Peminjaman Ruangan #${booking.id}`} />

            <div className="min-h-screen bg-gray-50/50 px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header with Back Navigation */}
                    <div className="mb-6">
                        <Link
                            href="/booking-rooms"
                            className="group mb-4 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
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
                        </Link>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Detail Peminjaman Ruangan #{booking.id}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Informasi lengkap tentang peminjaman ruangan
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${statusConfig[booking.status].className}`}
                                >
                                    {statusConfig[booking.status].icon}
                                    <span>
                                        {statusConfig[booking.status].label}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Cards */}
                    <div className="space-y-6">
                        {/* Booking Information Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                <h2 className="flex items-center font-semibold text-gray-800">
                                    <Info className="mr-2 h-5 w-5 text-blue-500" />
                                    Informasi Peminjaman
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                ID Peminjaman
                                            </dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900">
                                                #{booking.id}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Tanggal Mulai
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(
                                                    booking.start_at,
                                                ).toLocaleString('id-ID')}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Tanggal Selesai
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">

                                                {new Date(
                                                    booking.end_at,
                                                ).toLocaleString('id-ID')}
                                            </dd>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Peminjam
                                            </dt>
                                            <dd className="mt-1 flex items-center text-sm text-gray-900">
                                                <User className="mr-2 h-4 w-4 text-gray-400" />
                                                {booking.user.name}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Catatan Admin
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {booking.admin_note ||
                                                    'Tidak ada catatan'}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Room Information Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                <h2 className="flex items-center font-semibold text-gray-800">
                                    <Home className="mr-2 h-5 w-5 text-emerald-500" />
                                    Informasi Ruangan
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Nama Ruangan
                                            </dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900">
                                                {booking.room.name}
                                            </dd>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Kapasitas
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {booking.room.capacity} orang
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Information Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                <h2 className="flex items-center font-semibold text-gray-800">
                                    <MapPin className="mr-2 h-5 w-5 text-purple-500" />
                                    Informasi Acara
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Nama Acara
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {booking.event_name}
                                            </dd>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Jenis Acara
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {eventModeLabels[
                                                    booking.event_mode
                                                ] || booking.event_mode}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/booking-rooms"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        >
                            Kembali ke Daftar
                        </Link>

                        <Link
                            href={`/booking-rooms/${booking.id}/edit`}
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Edit Peminjaman
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
