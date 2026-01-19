import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

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
    end_at: string | null;
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link
                        href="/borrowings/create"
                        className="mb-4 cursor-pointer rounded bg-blue-600 px-5 py-3 text-sm text-white transition hover:bg-blue-700"
                    >
                        Tambah Peminjaman
                    </Link>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-semibold">
                                Riwayat Peminjaman Asset
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-2">
                                                ID
                                            </th>
                                            <th className="border px-4 py-2">
                                                Tanggal Peminjaman
                                            </th>
                                            <th className="border px-4 py-2">
                                                Tanggal Pengembalian
                                            </th>
                                            <th className="border px-4 py-2">
                                                Barang
                                            </th>
                                            <th className="border px-4 py-2">
                                                Status
                                            </th>
                                            <th className="border px-4 py-2 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.length > 0 ? (
                                            data.map((borrowing) => (
                                                <tr key={borrowing.id}>
                                                    <td className="border px-4 py-2">
                                                        {borrowing.id}
                                                    </td>

                                                    <td className="border px-4 py-2">
                                                        {new Date(
                                                            borrowing.start_at,
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    <td className="border px-4 py-2">
                                                        {borrowing.returned_at
                                                            ? new Date(
                                                                  borrowing.returned_at,
                                                              ).toLocaleDateString()
                                                            : '-'}
                                                    </td>

                                                    <td className="border px-4 py-2">
                                                        <ul className="list-disc pl-4">
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
                                                                        (
                                                                        {
                                                                            detail.quantity
                                                                        }
                                                                        )
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </td>

                                                    <td className="border px-4 py-2">
                                                        <span
                                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${statusBadge[borrowing.status].className}`}
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                            {
                                                                statusBadge[
                                                                    borrowing
                                                                        .status
                                                                ].label
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="border px-4 py-2 text-center">
                                                        <div className="flex justify-center gap-2">
                                                            {/* Edit Button */}
                                                            <button className="cursor-pointer rounded bg-blue-700 px-3 py-1 text-sm text-white transition hover:bg-blue-800">
                                                                Edit
                                                            </button>

                                                            {/* Delete Button */}
                                                            <button className="cursor-pointer rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700">
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
                                                    className="border px-4 py-2 text-center text-gray-500"
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
            </div>
        </AppLayout>
    );
}
