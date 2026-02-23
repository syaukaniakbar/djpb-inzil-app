import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/custom/pagination';
import formatDateTime from '@/utils/date';
import { StatusBadge } from '@/components/custom/status-badge';
import SearchFilter from '@/components/custom/search-filter';
import type { VehicleBorrowingsIndexProps } from '@/types/vehicle-borrowing';
import { ActionCell } from '@/components/action-cell';

export default function Index({ borrowings, admin, filters }: VehicleBorrowingsIndexProps) {
    const data = borrowings.data;

    const purposeLabels: Record<string, string> = {
        dalam_kota: 'Dalam Kota',
        luar_kota: 'Luar Kota',
    };

    return (
        <AppLayout>
            <Head title="Peminjaman Kendaraan" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                Riwayat Peminjaman Kendaraan
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Daftar peminjaman kendaraan yang pernah dilakukan
                            </p>
                        </div>

                        <Link
                            href="/vehicle-borrowings/create"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            + Tambah Peminjaman Kendaraan
                        </Link>
                    </div>

                    <SearchFilter
                        baseUrl="/vehicle-borrowings"
                        filters={filters}
                        placeholder="Cari ID, Kendaraan, Tujuan, atau Peruntukan..."
                        statusOptions={[
                            { label: 'Menunggu', value: 'pending' },
                            { label: 'Disetujui', value: 'approved' },
                            { label: 'Digunakan', value: 'ongoing' },
                            { label: 'Selesai', value: 'finished' },
                            { label: 'Dibatalkan', value: 'canceled' },
                        ]}
                    />

                    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900">
                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            {data.length > 0 ? (
                                data.map((borrowing) => (
                                    <div
                                        key={borrowing.id}
                                        className="mb-4 space-y-4 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                    Peminjaman Kendaraan #{borrowing.id}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDateTime(borrowing.start_at)} – {formatDateTime(borrowing.end_at)}
                                                </p>
                                            </div>
                                            <StatusBadge status={borrowing.status} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Kendaraan</p>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{borrowing.vehicle.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Plat: {borrowing.vehicle.license_plate}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Jenis Perjalanan</p>
                                            <div className="mt-1">
                                                {borrowing.purpose === 'dalam_kota' ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        <span className="h-1.5 w-1.5 rounded bg-emerald-500"></span>Dalam Kota
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                        <span className="h-1.5 w-1.5 rounded bg-indigo-500"></span>Luar Kota
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Tujuan Perjalanan</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{borrowing.destination}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Tanggal Pengembalian Aktual</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{borrowing.returned_at ? formatDateTime(borrowing.returned_at) : '-'}</p>
                                        </div>
                                        {borrowing.admin_note && (
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Catatan Admin</p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{borrowing.admin_note}</p>
                                            </div>
                                        )}
                                        <div className="space-y-2 border-t border-gray-100 pt-5 dark:border-gray-700">
                                            <ActionCell
                                                id={borrowing.id}
                                                status={borrowing.status}
                                                baseRoute="/vehicle-borrowings"
                                                adminPhone={admin.phone}
                                                userName={borrowing.user?.name}
                                                itemName={borrowing.vehicle.name}
                                                borrowedAt={borrowing.start_at}
                                                returnedAt={borrowing.returned_at}
                                                hasReturnAction
                                                returnLabel="Kembalikan"
                                                whatsappMessage={`DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Kendaraan] \n \nSaya ingin mengajukan peminjaman kendaraan dengan detail berikut: \n\n#ID Peminjaman: ${borrowing.id}\nNama: ${borrowing.user?.name || 'Tidak Diketahui'}\nKendaraan: ${borrowing.vehicle.name}\nTanggal Peminjaman: ${formatDateTime(borrowing.start_at)} \nTanggal Pengembalian: ${formatDateTime(borrowing.end_at)}\n\n Menunggu persetujuan.`}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">Tidak ada data peminjaman kendaraan</div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Kendaraan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tanggal Peminjaman</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tanggal Pengembalian</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tanggal Pengembalian Aktual</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Jenis Perjalanan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tujuan Perjalanan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Catatan Admin</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                    {data.length > 0 ? (
                                        data.map((borrowing) => (
                                            <tr key={borrowing.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-white font-mono">#{borrowing.id}</td>
                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                    <div className="font-semibold text-gray-900 dark:text-white">{borrowing.vehicle.name}</div>
                                                    <div className="text-gray-500 text-xs dark:text-gray-400">{borrowing.vehicle.license_plate}</div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{formatDateTime(borrowing.start_at)}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{formatDateTime(borrowing.end_at)}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{borrowing.returned_at ? formatDateTime(borrowing.returned_at) : '-'}</td>
                                                <td className="px-4 py-3">
                                                    {borrowing.purpose === 'dalam_kota' ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Dalam Kota
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>Luar Kota
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-[150px] truncate">{borrowing.destination}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500 italic max-w-[150px] truncate dark:text-gray-400">{borrowing.admin_note || '-'}</td>
                                                <td className="px-4 py-3"><StatusBadge status={borrowing.status} /></td>
                                                <td className="px-4 py-3 w-44">
                                                    <ActionCell
                                                        id={borrowing.id}
                                                        status={borrowing.status}
                                                        baseRoute="/vehicle-borrowings"
                                                        adminPhone={admin.phone}
                                                        userName={borrowing.user?.name}
                                                        itemName={borrowing.vehicle.name}
                                                        borrowedAt={borrowing.start_at}
                                                        returnedAt={borrowing.returned_at}
                                                        hasReturnAction
                                                        returnLabel="Kembalikan"
                                                        whatsappMessage={`Halo Admin, saya ingin konfirmasi peminjaman kendaraan dengan ID: ${borrowing.id}.`}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={10} className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">Tidak ada data peminjaman kendaraan</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Pagination links={borrowings.links} meta={borrowings.meta} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
