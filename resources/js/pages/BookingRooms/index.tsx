import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/custom/pagination';
import formatDateTime from '@/utils/date';
import { StatusBadge } from '@/components/custom/status-badge';
import SearchFilter from '@/components/custom/search-filter';
import type { BookingRoomsIndexProps } from '@/types/booking-room';

const eventModeLabels: Record<string, string> = {
    online: 'Online',
    offline: 'Offline',
    hybrid: 'Hybrid',
};

export default function Index({ bookings, admin, filters }: BookingRoomsIndexProps) {
    const data = bookings.data;

    return (
        <AppLayout>
            <Head title="Peminjaman Ruangan" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                Riwayat Peminjaman Ruangan
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
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

                    <SearchFilter
                        baseUrl="/booking-rooms"
                        filters={filters}
                        placeholder="Cari ID Peminjaman, Ruangan, atau Nama Acara..."
                        statusOptions={[
                            { label: 'Menunggu', value: 'pending' },
                            { label: 'Disetujui', value: 'approved' },
                            { label: 'Digunakan', value: 'ongoing' },
                            { label: 'Selesai', value: 'finished' },
                            { label: 'Ditolak', value: 'rejected' },
                            { label: 'Dibatalkan', value: 'canceled' },
                        ]}
                    />

                    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900">
                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            {data.length > 0 ? (
                                data.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="mb-4 space-y-4 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                    Peminjaman Ruangan #{booking.id}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDateTime(booking.start_at)} – {formatDateTime(booking.end_at)}
                                                </p>
                                            </div>
                                            <StatusBadge status={booking.status} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Ruangan</p>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{booking.room.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Kapasitas: {booking.room.capacity} orang</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Jenis Acara</p>
                                            <div className="mt-1">
                                                {eventModeLabels[booking.event_mode] ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        <span className="h-1.5 w-1.5 rounded bg-emerald-500"></span>
                                                        {eventModeLabels[booking.event_mode]}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                        <span className="h-1.5 w-1.5 rounded bg-indigo-500"></span>
                                                        {booking.event_mode}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Nama Acara</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{booking.event_name}</p>
                                        </div>
                                        {booking.admin_note && (
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Catatan Admin</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{booking.admin_note}</p>
                                            </div>
                                        )}
                                        <div className="space-y-2 border-t border-gray-100 pt-5 dark:border-gray-700">
                                            <Link
                                                href={`/booking-rooms/${booking.id}`}
                                                className="block cursor-pointer rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                Detail
                                            </Link>
                                            {booking.status === 'pending' && (
                                                <>
                                                    <Link
                                                        href={`/booking-rooms/${booking.id}/edit`}
                                                        className="block rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                    >
                                                        Ubah
                                                    </Link>
                                                    <a
                                                        href={`https://wa.me/${admin.phone}?text=${encodeURIComponent(`DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Ruangan] \n \nSaya ingin mengajukan peminjaman ruangan dengan detail berikut: \n\n#ID Peminjaman: ${booking.id}\nNama: ${booking.user?.name || 'Tidak Diketahui'}\nRuangan: ${booking.room.name}\nTanggal Peminjaman: ${formatDateTime(booking.start_at)} \nTanggal Pengembalian: ${formatDateTime(booking.end_at)}\n\n Menunggu persetujuan.`)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none dark:border-green-700 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700"
                                                    >
                                                        <span>Hubungi Admin</span>
                                                        <span className="text-xs font-normal text-green-600 dark:text-green-300">via WhatsApp</span>
                                                    </a>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) {
                                                                router.patch(`/booking-rooms/${booking.id}/cancel`);
                                                            }
                                                        }}
                                                        className="cursor-pointer w-full rounded-xl py-3 text-center text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                                                    >
                                                        Batalkan
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">Tidak ada data peminjaman ruangan</div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Ruangan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tanggal Peminjaman</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tanggal Pengembalian</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Jenis Acara</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Nama Acara</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Catatan Admin</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                    {data.length > 0 ? (
                                        data.map((booking) => (
                                            <tr key={booking.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">#{booking.id}</td>
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                    <div className="font-medium">{booking.room.name}</div>
                                                    <div className="text-gray-500 dark:text-gray-400">Kapasitas: {booking.room.capacity} orang</div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{formatDateTime(booking.start_at)}</td>
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{formatDateTime(booking.end_at)}</td>
                                                <td className="px-4 py-3">
                                                    {eventModeLabels[booking.event_mode] ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                            <span className="h-1.5 w-1.5 rounded bg-emerald-500"></span>
                                                            {eventModeLabels[booking.event_mode]}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                            <span className="h-1.5 w-1.5 rounded bg-indigo-500"></span>
                                                            {booking.event_mode}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.event_name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{booking.admin_note}</td>
                                                <td className="px-4 py-3"><StatusBadge status={booking.status} /></td>
                                                <td className="px-4 py-3 w-44">
                                                    <div className="flex flex-col gap-1.5">
                                                        <Link href={`/booking-rooms/${booking.id}`} className="w-full text-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700 shadow-sm">Detail</Link>
                                                        {booking.status === 'pending' && (
                                                            <>
                                                                <Link href={`/booking-rooms/${booking.id}/edit`} className="cursor-pointer w-full text-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Ubah</Link>
                                                                <a href={`https://wa.me/${admin.phone}?text=${encodeURIComponent(`DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Ruangan] \n \nSaya ingin mengajukan peminjaman ruangan dengan detail berikut: \n\n#ID Peminjaman: ${booking.id}\nNama: ${booking.user?.name || 'Tidak Diketahui'}\nRuangan: ${booking.room.name}\nTanggal Peminjaman: ${formatDateTime(booking.start_at)} \nTanggal Pengembalian: ${formatDateTime(booking.end_at)}\n\n Menunggu persetujuan.`)}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer w-full text-center rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 dark:border-green-700 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700">WhatsApp Admin</a>
                                                                <button type="button" onClick={(e) => { e.preventDefault(); if (confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) { router.patch(`/booking-rooms/${booking.id}/cancel`); } }} className="cursor-pointer w-full text-center text-xs font-medium text-red-600 hover:underline dark:text-red-400">Batalkan</button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={9} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">Tidak ada data peminjaman ruangan</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={bookings.links} meta={bookings.meta} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
