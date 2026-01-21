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
    name: string;
}

interface Borrowing {
    id: number;
    start_at: string;
    end_at: string;
    returned_at: string | null;
    status: string;
    user: User;
    borrowing_details: BorrowingDetail[];
}

const statusBadge: Record<
    Borrowing['status'],
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
        label: 'Sedang Dipinjam',
        className: 'bg-yellow-100 text-yellow-700',
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

interface Pagination<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface Props {
    borrowings: Pagination<Borrowing>;
}

export default function Index({ borrowings }: Props) {
    const data = borrowings.data;

    return (
        <AppLayout>
            <Head title="Borrowing" />

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
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            + Tambah Peminjaman
                        </Link>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                            ID
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
                                            Barang
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
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    #{borrowing.id}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {new Date(
                                                        borrowing.start_at,
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {new Date(
                                                        borrowing.end_at,
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    {borrowing.returned_at
                                                        ? new Date(
                                                              borrowing.returned_at,
                                                          ).toLocaleDateString()
                                                        : '-'}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                    <ul className="list-disc space-y-1 pl-4">
                                                        {borrowing.borrowing_details.map(
                                                            (detail) => (
                                                                <li
                                                                    key={
                                                                        detail.id
                                                                    }
                                                                >
                                                                    {
                                                                        detail
                                                                            .inventory
                                                                            .name
                                                                    }{' '}
                                                                    <span className="text-gray-500">
                                                                        (
                                                                        {
                                                                            detail.quantity
                                                                        }
                                                                        )
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadge[borrowing.status].className}`}
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                        {
                                                            statusBadge[
                                                                borrowing.status
                                                            ].label
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Link
                                                            href={`/borrowings/${borrowing.id}/edit`}
                                                            className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-700"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-700"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (confirm('Apakah Anda yakin ingin menghapus peminjaman ini?')) {
                                                                    router.delete(`/borrowings/${borrowing.id}`);
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-10 text-center text-sm text-gray-500"
                                            >
                                                Tidak ada data peminjaman
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
