import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

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

const statusBadge: Record<
    BookingRoom['status'],
    { label: string; className: string }
> = {
    pending: {
        label: 'Pending',
        className: 'bg-yellow-100 text-yellow-700',
    },
    approved: {
        label: 'Disetujui',
        className: 'bg-blue-100 text-blue-700',
    },
    ongoing: {
        label: 'Sedang Berlangsung',
        className: 'bg-yellow-100 text-yellow-700',
    },
    used: {
        label: 'Telah Digunakan',
        className: 'bg-purple-100 text-purple-700',
    },
    finished: {
        label: 'Selesai',
        className: 'bg-green-100 text-green-700',
    },
    rejected: {
        label: 'Ditolak',
        className: 'bg-red-100 text-red-700',
    },
    canceled: {
        label: 'Dibatalkan',
        className: 'bg-slate-100 text-slate-600',
    },
};

const eventModeLabels: Record<string, string> = {
    meeting: 'Meeting',
    presentation: 'Presentasi',
    training: 'Training',
    interview: 'Interview',
    other: 'Lainnya',
};

interface Pagination<T> {
    data: T[];
    links?: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    meta?: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

interface Props {
    bookings: Pagination<BookingRoom>;
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

                    <div className="overflow-hidden rounded-xl bg-white shadow">
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
                                                    {new Date(
                                                        booking.start_at,
                                                    ).toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}{' '}
                                                    –{' '}
                                                    {new Date(
                                                        booking.end_at,
                                                    ).toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>

                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadge[booking.status]?.className || 'bg-gray-100 text-gray-700'}`}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                {statusBadge[booking.status]
                                                    ?.label ||
                                                    'Status Tidak Dikenal'}
                                            </span>
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
                                        <div className="mt-5 space-y-4 border-t border-gray-100 pt-5">
                                            {/* Primary & Secondary Actions */}
                                            <div className="flex gap-3">
                                                <Link
                                                    href={`/booking-rooms/${booking.id}`}
                                                    className="flex-[2] rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                                >
                                                    Lihat Detail
                                                </Link>

                                                <Link
                                                    href={`/booking-rooms/${booking.id}/edit`}
                                                    className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
                                                >
                                                    Edit
                                                </Link>
                                            </div>

                                            {/* WhatsApp Contact */}
                                            <a
                                                href={`https://wa.me/62895704149841?text=${encodeURIComponent(
                                                    `Halo Admin, saya ingin konfirmasi peminjaman ruangan dengan ID: ${booking.id}.`,
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none"
                                            >
                                                <span>Hubungi Admin</span>
                                                <span className="text-xs font-normal text-green-600">
                                                    via WhatsApp
                                                </span>
                                            </a>

                                            {/* Destructive Action */}
                                            {booking.status === 'pending' && (
                                                <div className="pt-1 text-center">
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
                                                        className="text-xs font-medium text-red-400 transition hover:text-red-600 hover:underline focus:outline-none"
                                                    >
                                                        Batalkan Peminjaman
                                                    </button>
                                                </div>
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
                                                    {new Date(
                                                        booking.start_at,
                                                    ).toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {new Date(
                                                        booking.end_at,
                                                    ).toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
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
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadge[booking.status].className}`}
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                        {
                                                            statusBadge[
                                                                booking.status
                                                            ].label
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3 w-44">
                                                    <div className="flex flex-col gap-1.5">
                                                        <Link
                                                            href={`/booking-rooms/${booking.id}`}
                                                            className="w-full text-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700 shadow-sm"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={`/booking-rooms/${booking.id}/edit`}
                                                            className="w-full text-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700 shadow-sm"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <a
                                                            href={`https://wa.me/62895704149841?text=${encodeURIComponent(
                                                                `Halo Admin, saya ingin konfirmasi peminjaman ruangan dengan ID: ${booking.id}.`
                                                            )}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full text-center rounded-md border border-green-200 bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 transition hover:bg-green-200 shadow-sm"
                                                        >
                                                            WhatsApp Admin
                                                        </a>
                                                        {booking.status === 'pending' && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) {
                                                                        router.patch(`/booking-rooms/${booking.id}/cancel`);
                                                                    }
                                                                }}
                                                                className="cursor-pointer w-full text-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 shadow-sm"
                                                            >
                                                                Cancel
                                                            </button>
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

                        {/* Pagination Controls */}
                        {bookings?.links && bookings.links.length > 2 && (
                            <div className="mt-4 flex flex-col items-center border-t border-gray-100 px-4 py-3">
                                <div className="flex flex-wrap items-center justify-center gap-1">
                                    {bookings.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (link.url && !link.active) {
                                                    // Parse the URL to extract query parameters
                                                    const url = new URL(
                                                        link.url,
                                                    );
                                                    const params: Record<string, string> = {};
                                                    for (const [
                                                        key,
                                                        value,
                                                    ] of url.searchParams.entries()) {
                                                        params[key] = value;
                                                    }

                                                    // Use Inertia router to navigate to the page while preserving other query parameters
                                                    router.get(
                                                        window.location
                                                            .pathname,
                                                        params,
                                                        {
                                                            preserveState: true,
                                                            preserveScroll: true,
                                                            replace: true,
                                                        },
                                                    );
                                                }
                                            }}
                                            disabled={!link.url || link.active}
                                            className={`rounded px-3 py-2 text-sm ${link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                } ${!link.url || link.active
                                                    ? 'cursor-not-allowed opacity-50'
                                                    : 'cursor-pointer'
                                                }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>

                                {bookings.meta && (
                                    <div className="mt-3 text-sm text-gray-600">
                                        Showing{' '}
                                        {(bookings.meta.current_page - 1) *
                                            10 +
                                            1}
                                        -
                                        {Math.min(
                                            bookings.meta.current_page * 10,
                                            bookings.meta.total,
                                        )}{' '}
                                        of {bookings.meta.total} records
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
