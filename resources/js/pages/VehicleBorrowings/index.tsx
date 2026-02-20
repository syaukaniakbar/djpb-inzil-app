import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/custom/pagination';
import { PaginatedResponse } from '@/types/pagination';
import formatDateTime from '@/utils/date';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';

interface Admin {
    id: number;
    name: string;
    phone: string;
}

interface Vehicle {
    id: number;
    name: string;
    license_plate: string;
    brand: string;
    model: string;
    color: string;
    fuel_type: string;
    registration_expiry: string;
    year: number;
}

interface User {
    id: number;
    name: string;
}

interface VehicleBorrowing {
    id: number;
    start_at: string;
    end_at: string;
    returned_at: string | null;
    purpose: string;
    destination: string;
    status: LoanStatus;
    admin_note: string | null;
    user: User;
    vehicle: Vehicle;
}

interface Props {
    borrowings: PaginatedResponse<VehicleBorrowing>;
    admin: Admin;
}

export default function Index({ borrowings, admin }: Props) {
    const data = borrowings.data;

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
                                            <Link
                                                href={`/vehicle-borrowings/${borrowing.id}`}
                                                className="block rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                Detail
                                            </Link>
                                            {borrowing.status === 'pending' && (
                                                <>
                                                    <Link
                                                        href={`/vehicle-borrowings/${borrowing.id}/edit`}
                                                        className="block rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                    >
                                                        Ubah
                                                    </Link>
                                                    <a
                                                        href={`https://wa.me/${admin.phone}?text=${encodeURIComponent(`DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Kendaraan] \n \nSaya ingin mengajukan peminjaman kendaraan dengan detail berikut: \n\n#ID Peminjaman: ${borrowing.id}\nNama: ${borrowing.user.name}\nKendaraan: ${borrowing.vehicle.name}\nTanggal Peminjaman: ${formatDateTime(borrowing.start_at)} \nTanggal Pengembalian: ${formatDateTime(borrowing.end_at)}\n\n Menunggu persetujuan.`)}`}
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
                                                                router.patch(`/vehicle-borrowings/${borrowing.id}/cancel`);
                                                            }
                                                        }}
                                                        className="cursor-pointer w-full rounded-xl py-3 text-center text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                                                    >
                                                        Batalkan
                                                    </button>
                                                </>
                                            )}
                                            {borrowing.status === 'ongoing' && !borrowing.returned_at && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (confirm('Apakah Anda yakin kendaraan sudah dikembalikan?')) {
                                                            router.patch(`/vehicle-borrowings/${borrowing.id}/return`);
                                                        }
                                                    }}
                                                    className="cursor-pointer w-full rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                                >
                                                    Kembalikan
                                                </button>
                                            )}
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
                                                    <div className="flex flex-col gap-1.5">
                                                        <Link href={`/vehicle-borrowings/${borrowing.id}`} className="cursor-pointer w-full text-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 shadow-sm">Detail</Link>
                                                        {borrowing.status === 'pending' && (
                                                            <>
                                                                <Link href={`/vehicle-borrowings/${borrowing.id}/edit`} className="cursor-pointer w-full text-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Ubah</Link>
                                                                <a href={`https://wa.me/${admin.phone}?text=${encodeURIComponent(`Halo Admin, saya ingin konfirmasi peminjaman kendaraan dengan ID: ${borrowing.id}.`)}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer w-full text-center rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 dark:border-green-700 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700">WhatsApp Admin</a>
                                                                <button type="button" onClick={() => { if (confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) { router.patch(`/vehicle-borrowings/${borrowing.id}/cancel`); } }} className="cursor-pointer w-full text-center text-xs font-medium text-red-600 hover:underline dark:text-red-400">Batalkan</button>
                                                            </>
                                                        )}
                                                        {borrowing.status === 'ongoing' && !borrowing.returned_at && (
                                                            <button type="button" onClick={() => { if (confirm('Apakah Anda yakin kendaraan sudah dikembalikan?')) { router.patch(`/vehicle-borrowings/${borrowing.id}/return`); } }} className="cursor-pointer w-full text-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm">Kembalikan</button>
                                                        )}
                                                    </div>
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
