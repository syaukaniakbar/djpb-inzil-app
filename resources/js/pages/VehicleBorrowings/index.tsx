import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/custom/pagination';
import { PaginatedResponse } from '@/types/pagination';
import formatDateTime from '@/utils/date';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';

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
}

export default function Index({ borrowings }: Props) {
    const data = borrowings.data;

    return (
        <AppLayout>
            <Head title="Peminjaman Kendaraan" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Riwayat Peminjaman Kendaraan
                            </h1>
                            <p className="text-sm text-gray-500">
                                Daftar peminjaman kendaraan yang pernah
                                dilakukan
                            </p>
                        </div>

                        <Link
                            href="/vehicle-borrowings/create"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            + Tambah Peminjaman Kendaraan
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-white">
                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            {data.length > 0 ? (
                                data.map((borrowing) => (
                                    <div
                                        key={borrowing.id}
                                        className="mb-4 space-y-4 rounded-xl border border-gray-100 bg-white p-4"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    Peminjaman Kendaraan #{borrowing.id}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDateTime(borrowing.start_at)}
                                                    {' '}
                                                    –{' '}
                                                    {formatDateTime(borrowing.end_at)}
                                                </p>
                                            </div>
                                            <StatusBadge status={borrowing.status} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Kendaraan
                                            </p>
                                            <p className="text-sm font-medium text-gray-700">
                                                {borrowing.vehicle.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Plat: {borrowing.vehicle.license_plate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Jenis Perjalanan
                                            </p>
                                            <div className="mt-1">
                                                {borrowing.purpose ===
                                                    'dalam_kota' ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                                        <span className="h-1.5 w-1.5 rounded bg-emerald-500"></span>
                                                        Dalam Kota
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                                                        <span className="h-1.5 w-1.5 rounded bg-indigo-500"></span>
                                                        Luar Kota
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Tujuan Perjalanan
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {borrowing.destination}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Tanggal Pengembalian Aktual
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                {borrowing.returned_at
                                                    ? formatDateTime(borrowing.returned_at)
                                                    : '-'}
                                            </p>
                                        </div>

                                        {borrowing.admin_note && (
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">
                                                    Catatan Admin
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    {borrowing.admin_note}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="mt-5 space-y-2 border-t border-gray-100 pt-5">
                                            {/* Detail - selalu ada */}
                                            <Link
                                                href={`/vehicle-borrowings/${borrowing.id}`}
                                                className="block rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                Detail
                                            </Link>

                                            {/* Action khusus status pending */}
                                            {borrowing.status === 'pending' && (
                                                <>
                                                    {/* Edit */}
                                                    <Link
                                                        href={`/vehicle-borrowings/${borrowing.id}/edit`}
                                                        className="block rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Ubah
                                                    </Link>

                                                    {/* WhatsApp */}
                                                    <a
                                                        href={`https://wa.me/62895704149841?text=${encodeURIComponent(
                                                            `DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Kendaraan] \n \nSaya ingin mengajukan peminjaman kendaraan dengan detail berikut: \n\n#ID Peminjaman: ${borrowing.id}\nNama: ${borrowing.user.name}\nKendaraan: ${borrowing.vehicle.name}\nTanggal Peminjaman: ${formatDateTime(borrowing.start_at)} \nTanggal Pengembalian: ${formatDateTime(borrowing.end_at)}\n\n Menunggu persetujuan.`,
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
                                                                    `/vehicle-borrowings/${borrowing.id}/cancel`,
                                                                );
                                                            }
                                                        }}
                                                        className="cursor-pointer w-full rounded-xl py-3 text-center text-sm font-medium text-red-600"
                                                    >
                                                        Batalkan
                                                    </button>
                                                </>
                                            )}

                                            {/* Return Vehicle — hanya saat ongoing */}
                                            {borrowing.status === 'ongoing' && !borrowing.returned_at && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Apakah Anda yakin kendaraan sudah dikembalikan?',
                                                            )
                                                        ) {
                                                            router.patch(
                                                                `/vehicle-borrowings/${borrowing.id}/return`,
                                                            );
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
                                <div className="p-6 text-center text-sm text-gray-500">
                                    Tidak ada data peminjaman kendaraan
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
                                            Kendaraan
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tanggal Peminjaman
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tanggal Pengembalian
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tanggal Pengembalian Aktual
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Jenis Perjalanan
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tujuan Perjalanan
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
                                        data.map((borrowing) => (
                                            <tr
                                                key={borrowing.id}
                                                className="transition hover:bg-gray-50 border-b border-gray-100"
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                                                    #{borrowing.id}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    <div className="font-semibold text-gray-900">
                                                        {borrowing.vehicle.name}
                                                    </div>
                                                    <div className="text-gray-500 text-xs">
                                                        {borrowing.vehicle.license_plate}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {formatDateTime(borrowing.start_at)}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {formatDateTime(borrowing.end_at)}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {borrowing.returned_at
                                                        ? formatDateTime(borrowing.returned_at)
                                                        : '-'}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {borrowing.purpose === 'dalam_kota' ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                            Dalam Kota
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                                                            Luar Kota
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-600 max-w-[150px] truncate">
                                                    {borrowing.destination}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-500 italic max-w-[150px] truncate">
                                                    {borrowing.admin_note || '-'}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <StatusBadge status={borrowing.status} />
                                                </td>
                                                <td className="px-4 py-3 w-44">
                                                    <div className="flex flex-col gap-1.5">
                                                        {/* View — primary */}
                                                        <Link
                                                            href={`/vehicle-borrowings/${borrowing.id}`}
                                                            className="cursor-pointer w-full text-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 shadow-sm"
                                                        >
                                                            Detail
                                                        </Link>

                                                        {/* Action khusus status pending */}
                                                        {borrowing.status === 'pending' && (
                                                            <>
                                                                {/* Edit — secondary */}
                                                                <Link
                                                                    href={`/vehicle-borrowings/${borrowing.id}/edit`}
                                                                    className="cursor-pointer w-full text-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                                                >
                                                                    Ubah
                                                                </Link>

                                                                {/* WhatsApp — communication */}
                                                                <a
                                                                    href={`https://wa.me/62895704149841?text=${encodeURIComponent(
                                                                        `Halo Admin, saya ingin konfirmasi peminjaman kendaraan dengan ID: ${borrowing.id}.`
                                                                    )}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="cursor-pointer w-full text-center rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100"
                                                                >
                                                                    WhatsApp Admin
                                                                </a>

                                                                {/* Cancel — destructive (subtle) */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) {
                                                                            router.patch(`/vehicle-borrowings/${borrowing.id}/cancel`);
                                                                        }
                                                                    }}
                                                                    className="cursor-pointer w-full text-center text-xs font-medium text-red-600 hover:underline"
                                                                >
                                                                    Batalkan
                                                                </button>
                                                            </>
                                                        )}

                                                        {/* Return Vehicle — primary contextual */}
                                                        {borrowing.status === 'ongoing' && !borrowing.returned_at && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (confirm('Apakah Anda yakin kendaraan sudah dikembalikan?')) {
                                                                        router.patch(`/vehicle-borrowings/${borrowing.id}/return`);
                                                                    }
                                                                }}
                                                                className="cursor-pointer w-full text-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm"
                                                            >
                                                                Kembalikan
                                                            </button>
                                                        )}
                                                    </div>

                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={10}
                                                className="px-4 py-10 text-center text-sm text-gray-500"
                                            >
                                                Tidak ada data peminjaman
                                                kendaraan
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            links={borrowings.links}
                            meta={borrowings.meta}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
