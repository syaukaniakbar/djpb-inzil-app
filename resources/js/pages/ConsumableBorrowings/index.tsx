import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/custom/pagination';
import { PaginatedResponse } from '@/types/pagination';
import formatDateTime from '@/utils/date';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';

interface ConsumableItem {
    id: number;
    name: string;
    sku: string | null;
}

interface User {
    id: number;
    name: string;
}

interface ConsumableBorrowing {
    id: number;
    borrowed_at: string;
    quantity: number;
    status: LoanStatus;
    notes: string | null;
    user: User;
    consumable_item: ConsumableItem;
}

interface Admin {
    phone: string;
}

interface Props {
    borrowings: PaginatedResponse<ConsumableBorrowing>;
    admin: Admin;
}

export default function ConsumableBorrowingsIndex({ borrowings, admin }: Props) {
    const data = borrowings.data;

    return (
        <AppLayout>
            <Head title="Peminjaman Persediaan" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                Riwayat Peminjaman Persediaan
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Daftar peminjaman persediaan yang pernah dilakukan
                            </p>
                        </div>

                        <Link
                            href="/consumable-borrowings/create"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700"
                        >
                            + Tambah Peminjaman Persediaan
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900">
                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            {data.length > 0 ? (
                                data.map((borrowing) => (
                                    <div
                                        key={borrowing.id}
                                        className="mb-4 space-y-4 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-800"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                    Peminjaman #{borrowing.id}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDateTime(borrowing.borrowed_at)}
                                                </p>
                                            </div>

                                            <StatusBadge status={borrowing.status} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Barang
                                            </p>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {borrowing.consumable_item.name}
                                            </p>
                                            {borrowing.consumable_item.sku && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SKU: {borrowing.consumable_item.sku}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Jumlah
                                            </p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                {borrowing.quantity}
                                            </p>
                                        </div>

                                        {borrowing.notes && (
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Catatan
                                                </p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    {borrowing.notes}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="mt-5 space-y-2 border-t border-gray-100 pt-5 dark:border-gray-700">
                                            <Link
                                                href={`/consumable-borrowings/${borrowing.id}`}
                                                className="block rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                            >
                                                Detail
                                            </Link>

                                            {borrowing.status === 'pending' && (
                                                <>
                                                    <Link
                                                        href={`/consumable-borrowings/${borrowing.id}/edit`}
                                                        className="block rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
                                                    >
                                                        Ubah
                                                    </Link>

                                                    <a
                                                        href={`https://wa.me/${admin.phone}?text=${encodeURIComponent(
                                                            `DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Persediaan]\n \nSaya ingin mengajukan peminjaman persediaan dengan detail berikut: \n\n#ID Peminjaman: ${borrowing.id}\nNama: ${borrowing.user.name}\nBarang: ${borrowing.consumable_item.name}\nJumlah: ${borrowing.quantity}\nTanggal Peminjaman: ${formatDateTime(borrowing.borrowed_at)}\n\n Menunggu persetujuan.`,
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none dark:border-green-700 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700"
                                                    >
                                                        <span>Hubungi Admin</span>
                                                        <span className="text-xs font-normal text-green-600 dark:text-green-300">
                                                            via WhatsApp
                                                        </span>
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    'Apakah Anda yakin ingin membatalkan peminjaman ini?',
                                                                )
                                                            ) {
                                                                router.patch(
                                                                    `/consumable-borrowings/${borrowing.id}/cancel`,
                                                                );
                                                            }
                                                        }}
                                                        className="cursor-pointer w-full rounded-xl py-3 text-center text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                                                    >
                                                        Batalkan
                                                    </button>
                                                </>
                                            )}

                                            {borrowing.status === 'ongoing' && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Apakah Anda yakin persediaan sudah dikembalikan?',
                                                            )
                                                        ) {
                                                            router.patch(
                                                                `/consumable-borrowings/${borrowing.id}/return`,
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
                                <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Tidak ada data peminjaman persediaan
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Tanggal Peminjaman
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Barang
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Jumlah
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Catatan
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                    {data.length > 0 ? (
                                        data.map((borrowing) => (
                                            <tr
                                                key={borrowing.id}
                                                className="transition hover:bg-gray-50 border-b border-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-700 font-mono dark:text-white">
                                                    #{borrowing.id}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                                                    {formatDateTime(borrowing.borrowed_at)}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-white">
                                                    <div className="font-semibold text-gray-900 dark:text-white">
                                                        {borrowing.consumable_item.name}
                                                    </div>
                                                    {borrowing.consumable_item.sku && (
                                                        <div className="text-gray-500 text-xs dark:text-gray-400">
                                                            SKU: {borrowing.consumable_item.sku}
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                    {borrowing.quantity}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-500 italic max-w-[150px] truncate dark:text-gray-400">
                                                    {borrowing.notes || '-'}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <StatusBadge status={borrowing.status} />
                                                </td>

                                                <td className="px-4 py-3 w-44">
                                                    <div className="flex flex-col gap-1.5">
                                                        <Link
                                                            href={`/consumable-borrowings/${borrowing.id}`}
                                                            className="cursor-pointer w-full text-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 shadow-sm"
                                                        >
                                                            Detail
                                                        </Link>

                                                        {borrowing.status === 'pending' && (
                                                            <>
                                                                <Link
                                                                    href={`/consumable-borrowings/${borrowing.id}/edit`}
                                                                    className="cursor-pointer w-full text-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                                >
                                                                    Ubah
                                                                </Link>

                                                                <a
                                                                    href={`https://wa.me/${admin.phone}?text=${encodeURIComponent(
                                                                        `Halo Admin, saya ingin konfirmasi peminjaman persediaan dengan ID: ${borrowing.id}.`,
                                                                    )}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="cursor-pointer w-full text-center rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 dark:border-green-700 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700"
                                                                >
                                                                    WhatsApp Admin
                                                                </a>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (
                                                                            confirm(
                                                                                'Apakah Anda yakin ingin membatalkan peminjaman ini?',
                                                                            )
                                                                        ) {
                                                                            router.patch(
                                                                                `/consumable-borrowings/${borrowing.id}/cancel`,
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="cursor-pointer w-full text-center text-xs font-medium text-red-600 hover:underline dark:text-red-400"
                                                                >
                                                                    Batalkan
                                                                </button>
                                                            </>
                                                        )}

                                                        {borrowing.status === 'ongoing' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            'Apakah Anda yakin persediaan sudah dikembalikan?',
                                                                        )
                                                                    ) {
                                                                        router.patch(
                                                                            `/consumable-borrowings/${borrowing.id}/return`,
                                                                        );
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
                                                colSpan={7}
                                                className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                Tidak ada data peminjaman persediaan
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
