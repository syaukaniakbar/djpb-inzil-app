import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/components/custom/pagination';
import { PaginatedResponse } from '@/types/pagination';
import formatDateTime from '@/utils/date';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';
import SearchFilter from '@/components/custom/search-filter';
import { ActionCell } from '@/components/action-cell';

interface Inventory {
    id: number;
    name: string;
}

interface BorrowingDetail {
    id: number;
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
    admin_note: string | null;
    status: LoanStatus;
    user: User;
    borrowing_details?: BorrowingDetail[];
}

interface Admin {
    phone: string;
}

interface Props {
    borrowings?: PaginatedResponse<Borrowing>;
    admin: Admin;
    filters?: {
        search?: string;
        status?: string;
        start_at_from?: string;
        start_at_to?: string;
    };
}

export default function BorrowingsIndex({ borrowings, admin, filters }: Props) {
    const data = borrowings?.data ?? [];

    return (
        <AppLayout>
            <Head title="Peminjaman Asset" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                Riwayat Peminjaman Asset
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
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

                    <SearchFilter
                        baseUrl="/borrowings"
                        filters={filters}
                        placeholder="Cari ID Peminjaman atau Nama Barang..."
                        statusOptions={[
                            { label: 'Menunggu', value: 'pending' },
                            { label: 'Disetujui', value: 'approved' },
                            { label: 'Digunakan', value: 'ongoing' },
                            { label: 'Selesai', value: 'finished' },
                            { label: 'Ditolak', value: 'rejected' },
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
                                                    Peminjaman #{borrowing.id}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDateTime(borrowing.start_at)} – {formatDateTime(borrowing.end_at)}
                                                </p>
                                            </div>

                                            <StatusBadge status={borrowing.status} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Barang
                                            </p>
                                            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-gray-700 dark:text-gray-300">
                                                {(borrowing.borrowing_details || []).map((detail) => (
                                                    <li key={detail.id}>
                                                        {detail.inventory?.name ?? 'Inventory tidak ditemukan'}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Pengembalian Aktual
                                            </p>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {borrowing.returned_at ? formatDateTime(borrowing.returned_at) : '-'}
                                            </p>
                                        </div>

                                        {borrowing.admin_note && (
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Catatan Admin
                                                </p>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    {borrowing.admin_note}
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="mt-5 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-5">
                                            <ActionCell
                                                id={borrowing.id}
                                                status={borrowing.status}
                                                baseRoute="/borrowings"
                                                adminPhone={admin.phone}
                                                userName={borrowing.user.name}
                                                itemName={(borrowing.borrowing_details || []).map(d => d.inventory?.name).join(', ') || 'Tidak Diketahui'}
                                                borrowedAt={borrowing.start_at}
                                                returnedAt={borrowing.returned_at}
                                                hasReturnAction
                                                returnLabel="Kembalikan"
                                                whatsappMessage={`DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Barang] \n \nSaya ingin mengajukan peminjaman barang dengan detail berikut: \n\n#ID Peminjaman: ${borrowing.id}\nNama: ${borrowing.user.name}\nBarang: ${(borrowing.borrowing_details || []).map(detail => detail.inventory?.name).join(', ')}\nTanggal Peminjaman: ${formatDateTime(borrowing.start_at)} \nTanggal Pengembalian: ${formatDateTime(borrowing.end_at)}\n\n Menunggu persetujuan.`}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Tidak ada data peminjaman
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        {['ID', 'Tgl Pinjam', 'Tgl Kembali', 'Kembali Aktual', 'Barang', 'Catatan Admin', 'Status', 'Action'].map(header => (
                                            <th key={header} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{header}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                    {data.map(borrowing => (
                                        <tr key={borrowing.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">#{borrowing.id}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{formatDateTime(borrowing.start_at)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{formatDateTime(borrowing.end_at)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{borrowing.returned_at ? formatDateTime(borrowing.returned_at) : '-'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                                <ul className="list-disc space-y-1 pl-4">
                                                    {(borrowing.borrowing_details || []).map(detail => (
                                                        <li key={detail.id}>
                                                            {detail.inventory?.name ?? 'Inventory tidak ditemukan'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{borrowing.admin_note ?? '-'}</td>
                                            <td className="px-4 py-3"><StatusBadge status={borrowing.status} /></td>
                                            <td className="px-4 py-3 w-44">
                                                <ActionCell
                                                    id={borrowing.id}
                                                    status={borrowing.status}
                                                    baseRoute="/borrowings"
                                                    adminPhone={admin.phone}
                                                    userName={borrowing.user.name}
                                                    itemName={(borrowing.borrowing_details || []).map(d => d.inventory?.name).join(', ') || 'Tidak Diketahui'}
                                                    borrowedAt={borrowing.start_at}
                                                    returnedAt={borrowing.returned_at}
                                                    hasReturnAction
                                                    returnLabel="Kembalikan"
                                                    whatsappMessage={`DITJEN PERBENDAHARAAN\nKANWIL DJPb PROV. KALTIM\n\n[Peminjaman Barang] \n \nSaya ingin mengajukan peminjaman barang dengan detail berikut: \n\n#ID Peminjaman: ${borrowing.id}\nNama: ${borrowing.user.name}\nBarang: ${(borrowing.borrowing_details || []).map(detail => detail.inventory?.name).join(', ')}\nTanggal Peminjaman: ${formatDateTime(borrowing.start_at)} \nTanggal Pengembalian: ${formatDateTime(borrowing.end_at)}\n\n Menunggu persetujuan.`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={borrowings?.links} meta={borrowings?.meta} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
