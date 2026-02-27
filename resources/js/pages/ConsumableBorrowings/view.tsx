import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import formatDateTime from '@/utils/date';
import { StatusBadge } from '@/components/custom/status-badge';
import { Info, Package, User, AlertCircle } from 'lucide-react';
import type { ConsumableBorrowingViewProps } from '@/types/consumable-borrowing';

export default function ConsumableBorrowingsView({ borrowing }: ConsumableBorrowingViewProps) {
    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) {
            return;
        }
        router.patch(`/consumable-borrowings/${borrowing.id}/cancel`);
    };

    return (
        <AppLayout>
            <Head title={`Lihat Peminjaman #${borrowing.id}`} />

            <div className="min-h-screen bg-gray-50/50 px-4 py-8 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">
                    {/* Header with Back Navigation */}
                    <div className="mb-6">
                        <Link
                            href="/consumable-borrowings"
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
                                    Informasi lengkap tentang peminjaman persediaan
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
                                                Tanggal Peminjaman
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                                                {formatDateTime(borrowing.borrowed_at)}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Jumlah
                                            </dt>
                                            <dd className="mt-1 flex items-center text-sm text-gray-900 dark:text-gray-300">
                                                <Package className="mr-2 h-4 w-4 text-gray-400" />
                                                {borrowing.quantity}
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

                        {/* Item Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                                <h2 className="flex items-center font-semibold text-gray-800 dark:text-white">
                                    <Package className="mr-2 h-5 w-5 text-emerald-500" />
                                    Barang yang Dipinjam
                                </h2>
                            </div>
                            <div className="p-6">
                                {borrowing.consumable_item ? (
                                    <div className="space-y-3">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Nama Barang
                                            </dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                {borrowing.consumable_item?.name || 'Nama Barang Tidak Tersedia'}
                                            </dd>
                                        </div>

                                        {borrowing.consumable_item?.sku && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    SKU
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                                                    {borrowing.consumable_item.sku}
                                                </dd>
                                            </div>
                                        )}

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Jumlah Dipinjam
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                                                {borrowing.quantity}
                                            </dd>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-4 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                        <p className="text-sm">
                                            Barang tidak ditemukan
                                        </p>
                                    </div>
                                )}
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
                                href={`/consumable-borrowings/${borrowing.id}/edit`}
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
