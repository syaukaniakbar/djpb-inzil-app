import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/custom/pagination';
import { PaginatedResponse } from '@/types/pagination';
import formatDateTime from '@/utils/date';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';

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
    status: LoanStatus;
    admin_note: string | null;
    user: User;
    room: Room;
}

const eventModeLabels: Record<string, string> = {
    online: 'Online',
    offline: 'Offline',
    hybrid: 'Hybrid',
};

interface Props {
    bookings: PaginatedResponse<BookingRoom>;
}

export default function Index({ bookings }: Props) {
    const data = bookings.data;

    return (
        <AppLayout>
            <Head title="Peminjaman Ruangan" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Riwayat Peminjaman Ruangan
                            </h1>
                            <p className="text-sm text-gray-500">
                                Daftar peminjaman ruangan yang pernah dilakukan
                            </p>
                        </div>

                        <Link
                            href="/booking-rooms/create"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            + Ajukan Peminjaman Ruangan
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-xl">
                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            {data.length > 0 ? (
                                data.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="mb-4 space-y-4 rounded-xl border border-gray-100 bg-white p-4"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    Peminjaman Ruangan #
                                                    {booking.id}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDateTime(booking.start_at)}
                                                    {' '}
                                                    –{' '}
                                                    {formatDateTime(booking.end_at)}
                                                </p>
                                            </div>

                                            <StatusBadge status={booking.status} />

                                        </div>

                                        {/* Room */}
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Ruangan
                                            </p>
                                            <p className="text-sm font-medium text-gray-700">
                                                {booking.room.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Kapasitas:{' '}
                                                {booking.room.capacity} orang
                                            </p>
                                        </div>

                                        {/* Event Mode */}
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Jenis Acara
                                            </p>
                                            <div className="mt-1">
                                                {eventModeLabels[
                                                    booking.event_mode
                                                ] ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                                        <span className="h-1.5 w-1.5 rounded-xl bg-emerald-500"></span>
                                                        {
                                                            eventModeLabels[
                                                            booking
                                                                .event_mode
                                                            ]
                                                        }
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                                                        <span className="h-1.5 w-1.5 rounded-xl bg-indigo-500"></span>
                                                        {booking.event_mode}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Event Name */}
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Nama Acara
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {booking.event_name}
                                            </p>
                                        </div>

                                        {/* Admin Note */}
                                        {booking.admin_note && (
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">
                                                    Catatan Admin
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    {booking.admin_note}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="space-y-2">
                                            {/* Primary Action: selalu ada */}
                                            <Link
                                                href={`/booking-rooms/${booking.id}`}
                                                className="block rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                Lihat Detail
                                            </Link>

                                            {/* Action khusus status pending */}
                                            {booking.status === 'pending' && (
                                                <>
                                                    {/* Secondary: Edit */}
                                                    <Link
                                                        href={`/booking-rooms/${booking.id}/edit`}
                                                        className="block rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Edit
                                                    </Link>

                                                    {/* WhatsApp */}
                                                    <a
                                                        href={`https://wa.me/62895704149841?text=${encodeURIComponent(
                                                            `DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Ruangan] \n \nSaya ingin mengajukan peminjaman ruangan dengan detail berikut: \n\n#ID Peminjaman: ${booking.id}\nNama: ${booking.user.name}\nRuangan: ${booking.room.name}\nTanggal Peminjaman: ${formatDateTime(booking.start_at)} \nTanggal Pengembalian: ${formatDateTime(booking.end_at)}\n\n Menunggu persetujuan.`
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        <span>Konfirmasi Admin</span>
                                                        <span className="text-xs font-normal text-green-600">
                                                            via WhatsApp
                                                        </span>
                                                    </a>

                                                    {/* Cancel */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    'Apakah Anda yakin ingin membatalkan peminjaman ini?',
                                                                )
                                                            ) {
                                                                router.patch(
                                                                    `/booking-rooms/${booking.id}/cancel`,
                                                                );
                                                            }
                                                        }}
                                                        className="cursor-pointer w-full rounded-xl py-3 text-center text-sm font-medium text-red-600"
                                                    >
                                                        Batalkan Peminjaman
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-sm text-gray-500">
                                    Tidak ada data peminjaman ruangan
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Ruangan
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tanggal Peminjaman
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tanggal Pengembalian
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Jenis Acara
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Nama Acara
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Catatan Admin
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {data.length > 0 ? (
                                        data.map((booking) => (
                                            <tr
                                                key={booking.id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    #{booking.id}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    <div className="font-medium">
                                                        {booking.room.name}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        Kapasitas:{' '}
                                                        {booking.room.capacity}{' '}
                                                        orang
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {formatDateTime(booking.start_at)}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {formatDateTime(booking.end_at)}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col gap-1">
                                                        {/* Badge Label */}
                                                        <div>
                                                            {eventModeLabels[
                                                                booking
                                                                    .event_mode
                                                            ] ? (
                                                                <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                                                    <span className="h-1.5 w-1.5 rounded-xl bg-emerald-500"></span>
                                                                    {
                                                                        eventModeLabels[
                                                                        booking
                                                                            .event_mode
                                                                        ]
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                                                                    <span className="h-1.5 w-1.5 rounded-xl bg-indigo-500"></span>
                                                                    {
                                                                        booking.event_mode
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    <div className="text-gray-500">
                                                        {booking.event_name}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    <div className="text-gray-500">
                                                        {booking.admin_note}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <StatusBadge status={booking.status} />
                                                </td>

                                                <td className="px-4 py-3 w-44">
                                                    <div className="flex flex-col gap-1.5">
                                                        {/* View - selalu ada */}
                                                        <Link
                                                            href={`/booking-rooms/${booking.id}`}
                                                            className="w-full text-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700 shadow-sm"
                                                        >
                                                            View
                                                        </Link>

                                                        {/* Action khusus status pending */}
                                                        {booking.status === 'pending' && (
                                                            <>
                                                                {/* Edit */}
                                                                <Link
                                                                    href={`/booking-rooms/${booking.id}/edit`}
                                                                    className="w-full text-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 shadow-sm"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                {/* Konfirmasi Admin via WhatsApp */}
                                                                <a
                                                                    href={`https://wa.me/62895704149841?text=${encodeURIComponent(
                                                                        `DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Ruangan] \n \nSaya ingin mengajukan peminjaman ruangan dengan detail berikut: \n\n#ID Peminjaman: ${booking.id}\nNama: ${booking.user.name}\nRuangan: ${booking.room.name}\nTanggal Peminjaman: ${formatDateTime(booking.start_at)} \nTanggal Pengembalian: ${formatDateTime(booking.end_at)}\n\n Menunggu persetujuan.`
                                                                    )}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-full text-center rounded-md border border-green-200 bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition hover:bg-green-200 shadow-sm"
                                                                >
                                                                    Konfirmasi Admin
                                                                </a>
                                                                {/* Cancel */}
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        if (
                                                                            confirm(
                                                                                'Apakah Anda yakin ingin membatalkan peminjaman ini?',
                                                                            )
                                                                        ) {
                                                                            router.patch(
                                                                                `/booking-rooms/${booking.id}/cancel`,
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="cursor-pointer w-full text-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 shadow-sm"
                                                                >
                                                                    Batalkan
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="px-4 py-10 text-center text-sm text-gray-500"
                                            >
                                                Tidak ada data peminjaman
                                                ruangan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            links={bookings?.links}
                            meta={bookings?.meta}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
