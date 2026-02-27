import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import formatDateTime from '@/utils/date';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';
import { Info, Package, User } from 'lucide-react';

interface Inventory {
    id: number;
    name: string;
}

interface BorrowingDetail {
    id: number;
    notes: string | null;
    inventory: Inventory | null;
}

interface User {
    id: number;
    name: string | null;
}

interface Borrowing {
    id: number;
    start_at: string;
    end_at: string;
    returned_at: string | null;
    status: LoanStatus;
    notes: string;
    user: User | null;
    borrowing_details: BorrowingDetail[];
}

interface Props {
    borrowing: Borrowing;
}

export default function View({ borrowing }: Props) {
    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) {
            return;
        }
        router.patch(`/borrowings/${borrowing.id}/cancel`);
    };

    return (
        <AppLayout>
            <Head title={`Lihat Peminjaman #${borrowing.id}`} />

            <div className="min-h-screen bg-gray-50/50 px-4 py-8 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">
                    {/* Header with Back Navigation */}
                    <div className="mb-6">
                        <Link
                            href="/borrowings"
                            className="group mb-4 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Kembali ke Daftar
                        </Link>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Detail Peminjaman #{borrowing.id}
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Informasi lengkap tentang peminjaman asset
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <StatusBadge status={borrowing.status} />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Cards */}
                    <div className="space-y-6">
                        {/* Borrowing Information Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                                <h2 className="flex items-center font-semibold text-gray-800 dark:text-white">
                                    <Info className="mr-2 h-5 w-5 text-blue-500" />
                                    Informasi Peminjaman
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                ID Peminjaman
                                            </dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                #{borrowing.id}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tanggal Mulai
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                                                {formatDateTime(borrowing.start_at)}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tanggal Selesai
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                                                {formatDateTime(borrowing.end_at)}
                                            </dd>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Peminjam
                                            </dt>
                                            <dd className="mt-1 flex items-center text-sm text-gray-900 dark:text-gray-300">
                                                <User className="mr-2 h-4 w-4 text-gray-400" />
                                                {borrowing.user?.name ||
                                                    'Nama Tidak Tersedia'}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Tanggal Pengembalian Aktual
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                                                {borrowing.returned_at
                                                    ? formatDateTime(borrowing.returned_at)
                                                    : 'Belum dikembalikan'}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Catatan
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                                                {borrowing.notes ||
                                                    'Tidak ada catatan'}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                                <h2 className="flex items-center font-semibold text-gray-800 dark:text-white">
                                    <Package className="mr-2 h-5 w-5 text-emerald-500" />
                                    Barang yang Dipinjam
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                                    Barang
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                                    Catatan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                            {borrowing.borrowing_details &&
                                                borrowing.borrowing_details.length >
                                                0 ? (
                                                borrowing.borrowing_details.map(
                                                    (detail) => (
                                                        <tr
                                                            key={detail.id}
                                                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                                        >
                                                            <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                                                {detail
                                                                    .inventory
                                                                    ?.name ||
                                                                    'Nama Barang Tidak Tersedia'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700 dark:text-gray-300">
                                                                {detail.notes ||
                                                                    '-'}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={2}
                                                        className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                                                    >
                                                        Tidak ada barang yang
                                                        dipinjam
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        {borrowing.status === 'pending' && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-200 transition-all hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            >
                                Batalkan Peminjaman
                            </button>
                        )}

                        {borrowing.status === 'pending' && (
                            <Link
                                href={`/borrowings/${borrowing.id}/edit`}
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Edit Peminjaman
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
