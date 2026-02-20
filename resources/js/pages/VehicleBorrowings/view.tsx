import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import formatDateTime from '@/utils/date';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';
import { Car, Info, MapPin, User } from 'lucide-react';

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
    borrowing: VehicleBorrowing;
}

export default function View({ borrowing }: Props) {
    return (
        <AppLayout>
            <Head title={`Lihat Peminjaman Kendaraan #${borrowing.id}`} />

            <div className="min-h-screen bg-gray-50/50 px-4 py-8 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-6">
                        <Link href="/vehicle-borrowings" className="group mb-4 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Daftar
                        </Link>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Peminjaman Kendaraan #{borrowing.id}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Informasi lengkap tentang peminjaman kendaraan</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusBadge status={borrowing.status} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
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
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ID Peminjaman</dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">#{borrowing.id}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Mulai</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{formatDateTime(borrowing.start_at)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Selesai</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{formatDateTime(borrowing.end_at)}</dd>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Peminjam</dt>
                                            <dd className="mt-1 flex items-center text-sm text-gray-900 dark:text-gray-300">
                                                <User className="mr-2 h-4 w-4 text-gray-400" />
                                                {borrowing.user.name}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Pengembalian Aktual</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.returned_at ? formatDateTime(borrowing.returned_at) : 'Belum dikembalikan'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Catatan Admin</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.admin_note || 'Tidak ada catatan'}</dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                                <h2 className="flex items-center font-semibold text-gray-800 dark:text-white">
                                    <Car className="mr-2 h-5 w-5 text-emerald-500" />
                                    Informasi Kendaraan
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Kendaraan</dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{borrowing.vehicle.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Plat Nomor</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.vehicle.license_plate}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Merek</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.vehicle.brand}</dd>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Model</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.vehicle.model}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tahun</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.vehicle.year}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Jenis Bahan Bakar</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.vehicle.fuel_type}</dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                                <h2 className="flex items-center font-semibold text-gray-800 dark:text-white">
                                    <MapPin className="mr-2 h-5 w-5 text-purple-500" />
                                    Informasi Perjalanan
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tujuan Perjalanan</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.destination}</dd>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Jenis Perjalanan</dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{borrowing.purpose === 'dalam_kota' ? 'Dalam Kota' : 'Luar Kota'}</dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Link href="/vehicle-borrowings" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">Kembali ke Daftar</Link>
                        <Link href={`/vehicle-borrowings/${borrowing.id}/edit`} className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">Edit Peminjaman</Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
