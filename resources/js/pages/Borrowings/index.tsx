import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

interface Inventory {
    id: number;
    name: string;
}

interface BorrowingDetail {
    id: number;
    quantity: number;
    notes: string | null;
    inventory: Inventory;
}

interface User {
    id: number;
}

interface Borrowing {
    id: number;
    start_at: string;
    end_at: string;
    returned_at: string | null;
    admin_note: string | null;
    status:
    | 'pending'
    | 'approved'
    | 'ongoing'
    | 'finished'
    | 'rejected'
    | 'canceled';
    user: User;
    borrowing_details?: BorrowingDetail[];
}

const statusBadge: Record<
    Borrowing['status'],
    { label: string; className: string }
> = {
    pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
    approved: { label: 'Disetujui', className: 'bg-blue-100 text-blue-700' },
    ongoing: {
        label: 'Sedang Dipinjam',
        className: 'bg-yellow-100 text-yellow-700',
    },
    finished: { label: 'Selesai', className: 'bg-green-100 text-green-700' },
    rejected: { label: 'Ditolak', className: 'bg-red-100 text-red-700' },
    canceled: {
        label: 'Dibatalkan',
        className: 'bg-slate-100 text-slate-600',
    },
};

interface Pagination<T> {
    data?: T[];
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
    borrowings?: Pagination<Borrowing>;
}

export default function BorrowingsIndex({ borrowings }: Props) {
    const data = borrowings?.data ?? [];

    return (
        <AppLayout>
            <Head title="Peminjaman Asset" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Riwayat Peminjaman Asset
                            </h1>
                            <p className="text-sm text-gray-500">
                                Daftar peminjaman barang yang pernah dilakukan
                            </p>
                        </div>

                        <Link
                            href="/borrowings/create"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700"
                        >
                            + Tambah Peminjaman
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-white">
                        <div className="md:hidden">
                            {data.length > 0 ? (
                                data?.map((borrowing) => (
                                    <div
                                        key={borrowing.id}
                                        className="mb-4 space-y-4 rounded-xl border border-gray-100 bg-white p-4"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">
                                                    Peminjaman #{borrowing.id}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(
                                                        borrowing.start_at,
                                                    ).toLocaleDateString()}{' '}
                                                    –{' '}
                                                    {new Date(
                                                        borrowing.end_at,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadge[borrowing.status]?.className || 'bg-gray-100 text-gray-700'}`}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                {statusBadge[borrowing.status]
                                                    ?.label ||
                                                    'Status Tidak Dikenal'}
                                            </span>
                                        </div>

                                        {/* Items */}
                                        <div>
                                            <p className="text-xs font-medium text-gray-500">
                                                Barang
                                            </p>
                                            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-gray-700">
                                                {(
                                                    borrowing.borrowing_details || []
                                                ).map((detail) => (
                                                    <li key={detail.id}>
                                                        {detail.inventory?.name ?? 'Inventory tidak ditemukan'}
                                                        <span className="text-gray-500">
                                                            ({detail.quantity})
                                                        </span>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>

                                        {/* Return */}
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Pengembalian Aktual
                                            </p>
                                            <p className="text-sm font-medium text-gray-700">
                                                {borrowing.returned_at
                                                    ? new Date(
                                                        borrowing.returned_at,
                                                    ).toLocaleDateString()
                                                    : '-'}
                                            </p>
                                        </div>

                                        {/* Admin Note */}
                                        {borrowing.admin_note && (
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Catatan Admin
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    {borrowing.admin_note}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="mt-5 space-y-4 border-t border-gray-100 pt-5">
                                            {/* Primary & Secondary Actions */}
                                            <div className="flex gap-3">
                                                <Link
                                                    href={`/borrowings/${borrowing.id}`}
                                                    className="flex-[2] rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                                >
                                                    Lihat Detail
                                                </Link>

                                                <Link
                                                    href={`/borrowings/${borrowing.id}/edit`}
                                                    className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
                                                >
                                                    Edit
                                                </Link>
                                            </div>

                                            {/* WhatsApp Contact */}
                                            <a
                                                href={`https://wa.me/62895704149841?text=${encodeURIComponent(
                                                    `Halo Admin, saya ingin konfirmasi peminjaman dengan ID: ${borrowing.id}.`,
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
                                            <div className="pt-1 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Apakah Anda yakin ingin membatalkan peminjaman ini?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/borrowings/${borrowing.id}`,
                                                            );
                                                        }
                                                    }}
                                                    className="text-xs font-medium text-red-400 transition hover:text-red-600 hover:underline focus:outline-none"
                                                >
                                                    Batalkan Peminjaman
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-sm text-gray-500">
                                    Tidak ada data peminjaman
                                </div>
                            )}
                        </div>

                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tgl Pinjam
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Tgl Kembali
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Kembali Aktual
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            Barang
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
                                    {data?.map((borrowing) => (
                                        <tr
                                            key={borrowing.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3 text-sm">
                                                #{borrowing.id}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(
                                                    borrowing.start_at,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(
                                                    borrowing.end_at,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {borrowing.returned_at
                                                    ? new Date(
                                                        borrowing.returned_at,
                                                    ).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <ul className="list-disc space-y-1 pl-4">
                                                    {(
                                                        borrowing.borrowing_details || []
                                                    ).map((detail) => (
                                                        <li key={detail.id}>
                                                            {detail.inventory?.name ?? 'Inventory tidak ditemukan'}
                                                            <span className="text-gray-500">
                                                                ({detail.quantity})
                                                            </span>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {borrowing.admin_note ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadge[borrowing.status]?.className || 'bg-gray-100 text-gray-700'}`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {statusBadge[
                                                        borrowing.status
                                                    ]?.label ||
                                                        'Status Tidak Dikenal'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/borrowings/${borrowing.id}`}
                                                        className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/borrowings/${borrowing.id}/edit`}
                                                        className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <a
                                                        href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                                                            `Halo Admin, Saya ingin konfirmasi peminjaman ID: ${borrowing.id}.`,
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="rounded-md border bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                                    >
                                                        Hubungi Admin via
                                                        WhatsApp
                                                    </a>
                                                    <button
                                                        className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    'Apakah Anda yakin ingin menghapus peminjaman ini?',
                                                                )
                                                            ) {
                                                                router.delete(
                                                                    `/borrowings/${borrowing.id}`,
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {borrowings?.links && borrowings.links.length > 2 && (
                            <div className="mt-4 flex flex-col items-center border-t border-gray-100 px-4 py-3">
                                <div className="flex flex-wrap items-center justify-center gap-1">
                                    {borrowings.links.map((link, index) => (
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

                                {borrowings.meta && (
                                    <div className="mt-3 text-sm text-gray-600">
                                        Showing{' '}
                                        {(borrowings.meta.current_page - 1) *
                                            10 +
                                            1}
                                        -
                                        {Math.min(
                                            borrowings.meta.current_page * 10,
                                            borrowings.meta.total,
                                        )}{' '}
                                        of {borrowings.meta.total} records
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
