import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Info,
    Package,
    User,
    XCircle,
} from 'lucide-react';

interface Inventory {
    id: number;
    name: string;
}

interface BorrowingDetail {
    id: number;
    quantity: number;
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
    status:
        | 'pending'
        | 'approved'
        | 'ongoing'
        | 'finished'
        | 'rejected'
        | 'canceled';
    notes: string;
    user: User | null;
    borrowing_details: BorrowingDetail[];
}

const statusConfig: Record<
    Borrowing['status'],
    { label: string; className: string; icon: JSX.Element }
> = {
    pending: {
        label: 'Pending',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <AlertCircle className="h-4 w-4" />,
    },
    approved: {
        label: 'Disetujui',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <CheckCircle className="h-4 w-4" />,
    },
    ongoing: {
        label: 'Sedang Dipinjam',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <Clock className="h-4 w-4" />,
    },
    finished: {
        label: 'Selesai',
        className: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className="h-4 w-4" />,
    },
    rejected: {
        label: 'Ditolak',
        className: 'bg-red-100 text-red-700 border-red-200',
        icon: <XCircle className="h-4 w-4" />,
    },
    canceled: {
        label: 'Dibatalkan',
        className: 'bg-slate-100 text-slate-600 border-slate-200',
        icon: <XCircle className="h-4 w-4" />,
    },
};

interface Props {
    borrowing: Borrowing;
}

export default function View({ borrowing }: Props) {
    return (
        <AppLayout>
            <Head title={`Lihat Peminjaman #${borrowing.id}`} />

            <div className="min-h-screen bg-gray-50/50 px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header with Back Navigation */}
                    <div className="mb-6">
                        <Link
                            href="/borrowings"
                            className="group mb-4 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-600"
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
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Detail Peminjaman #{borrowing.id}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Informasi lengkap tentang peminjaman asset
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${statusConfig[borrowing.status]?.className || 'border-gray-200 bg-gray-100 text-gray-700'}`}
                                >
                                    {statusConfig[borrowing.status]?.icon || (
                                        <Info className="h-4 w-4" />
                                    )}
                                    <span>
                                        {statusConfig[borrowing.status]
                                            ?.label || 'Status Tidak Dikenal'}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Cards */}
                    <div className="space-y-6">
                        {/* Borrowing Information Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                <h2 className="flex items-center font-semibold text-gray-800">
                                    <Info className="mr-2 h-5 w-5 text-blue-500" />
                                    Informasi Peminjaman
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                ID Peminjaman
                                            </dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900">
                                                #{borrowing.id}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Tanggal Mulai
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(
                                                    borrowing.start_at,
                                                ).toLocaleString('id-ID')}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Tanggal Selesai
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(
                                                    borrowing.end_at,
                                                ).toLocaleString('id-ID')}
                                            </dd>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Peminjam
                                            </dt>
                                            <dd className="mt-1 flex items-center text-sm text-gray-900">
                                                <User className="mr-2 h-4 w-4 text-gray-400" />
                                                {borrowing.user?.name ||
                                                    'Nama Tidak Tersedia'}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Tanggal Pengembalian Aktual
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {borrowing.returned_at
                                                    ? new Date(
                                                          borrowing.returned_at,
                                                      ).toLocaleString('id-ID')
                                                    : 'Belum dikembalikan'}
                                            </dd>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Catatan
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {borrowing.notes ||
                                                    'Tidak ada catatan'}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Card */}
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                <h2 className="flex items-center font-semibold text-gray-800">
                                    <Package className="mr-2 h-5 w-5 text-emerald-500" />
                                    Barang yang Dipinjam
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                    Barang
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                    Jumlah
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                    Catatan
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {borrowing.borrowing_details &&
                                            borrowing.borrowing_details.length >
                                                0 ? (
                                                borrowing.borrowing_details.map(
                                                    (detail) => (
                                                        <tr
                                                            key={detail.id}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">
                                                                {detail
                                                                    .inventory
                                                                    ?.name ||
                                                                    'Nama Barang Tidak Tersedia'}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                                                                {
                                                                    detail.quantity
                                                                }
                                                            </td>
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                                                                {detail.notes ||
                                                                    '-'}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={3}
                                                        className="px-4 py-6 text-center text-sm text-gray-500"
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
                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href="/borrowings"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                        >
                            Kembali ke Daftar
                        </Link>

                        <Link
                            href={`/borrowings/${borrowing.id}/edit`}
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Edit Peminjaman
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
