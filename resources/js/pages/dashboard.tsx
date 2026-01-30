import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { ReactNode } from 'react';
import {
    AlertCircle,
    Box,
    Car,
    CheckCircle,
    Clock,
    DoorOpen,
    History,
    PackageCheck,
    CalendarCheck,
    XCircle
} from 'lucide-react';


const statusConfig: Record<
    string,
    { label: string; className: string; icon: ReactNode }
> = {
    pending: {
        label: 'Pending',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <AlertCircle className="h-3 w-3" />,
    },
    approved: {
        label: 'Disetujui',
        className: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <CheckCircle className="h-3 w-3" />,
    },
    ongoing: {
        label: 'Sedang Dipinjam',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: <Clock className="h-3 w-3" />,
    },
    finished: {
        label: 'Selesai',
        className: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className="h-3 w-3" />,
    },
    rejected: {
        label: 'Ditolak',
        className: 'bg-red-100 text-red-700 border-red-200',
        icon: <XCircle className="h-3 w-3" />,
    },
    canceled: {
        label: 'Dibatalkan',
        className: 'bg-slate-100 text-slate-600 border-slate-200',
        icon: <XCircle className="h-3 w-3" />,
    },
    used: {
        label: 'Telah Digunakan',
        className: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: <CheckCircle className="h-3 w-3" />,
    },
};

interface Borrowing {
    id: number;
    user: { name: string };
    borrowing_details?: { inventory: { name: string } }[];
    created_at: string;
    status: string;
}

interface VehicleBorrowing {
    id: number;
    user: { name: string };
    vehicle: { name: string };
    created_at: string;
    status: string;
}

interface BookingRoom {
    id: number;
    user: { name: string };
    room: { name: string };
    created_at: string;
    status: string;
}

interface Stats {
    activeBorrowings: number;
    activeVehicleBorrowings: number;
    activeBookingRooms: number;
    totalInventories: number;
    totalVehicles: number;
    totalRooms: number;
}

interface PageProps extends InertiaPageProps {
    stats: Stats;
    recentBorrowings: Borrowing[];
    recentVehicleBorrowings: VehicleBorrowing[];
    recentBookingRooms: BookingRoom[];
    userBorrowings: Borrowing[];
    userVehicleBorrowings: VehicleBorrowing[];
    userBookingRooms: BookingRoom[];
}

const StatCard = ({
    title,
    value,
    icon: Icon,
    colorClass,
}: {
    title: string;
    value: number;
    icon: any;
    colorClass: string;
}) => (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md dark:bg-gray-800 dark:ring-gray-700">
        <div className="flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClass} bg-opacity-10`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {title}
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    </div>
);

const SectionCard = ({ title, children, href }: { title: string; children: React.ReactNode; href?: string }) => (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between border-b border-gray-50 p-5 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
        <div className="p-5">{children}</div>
    </div>
);

const EmptyState = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
        <History size={32} className="mb-2 opacity-20" />
        <p className="text-sm italic">{label}</p>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const config = statusConfig[status];
    if (!config) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
                <AlertCircle className="h-3 w-3" />
                Status Tidak Dikenal
            </span>
        );
    }

    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.className}`}>
            {config.icon}
            {config.label}
        </span>
    );
};

export default function Dashboard() {
    const { stats, recentBorrowings, recentVehicleBorrowings, recentBookingRooms, userBorrowings, userVehicleBorrowings, userBookingRooms } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

    const formatDate = (date: string) => new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    const formatDateTime = (date: string) => new Date(date).toLocaleString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl space-y-8 p-6">

                {/* ================= STATS GRID ================= */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <StatCard title="Persediaan Aktif" value={stats.activeBorrowings} icon={PackageCheck} colorClass="bg-blue-500 text-blue-600" />
                    <StatCard title="Kendaraan Aktif" value={stats.activeVehicleBorrowings} icon={Car} colorClass="bg-emerald-500 text-emerald-600" />
                    <StatCard title="Ruangan Aktif" value={stats.activeBookingRooms} icon={CalendarCheck} colorClass="bg-purple-500 text-purple-600" />
                    <StatCard title="Total Persediaan" value={stats.totalInventories} icon={Box} colorClass="bg-orange-500 text-orange-600" />
                    <StatCard title="Total Kendaraan" value={stats.totalVehicles} icon={Car} colorClass="bg-rose-500 text-rose-600" />
                    <StatCard title="Total Ruangan" value={stats.totalRooms} icon={DoorOpen} colorClass="bg-indigo-500 text-indigo-600" />
                </div>

                {/* ================= RECENT ACTIVITIES ================= */}
                <div className="grid gap-6 md:grid-cols-3">
                    <SectionCard title="Peminjaman Barang" href="#">
                        <div className="space-y-4">
                            {recentBorrowings.length ? recentBorrowings.map(b => (
                                <div key={b.id} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{b.user.name}</p>
                                            <StatusBadge status={b.status} />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                                            {b.borrowing_details?.map(d => d.inventory.name).join(', ') || '-'}
                                        </p>
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">{formatDateTime(b.created_at)}</p>
                                    </div>
                                </div>
                            )) : <EmptyState label="Belum ada aktivitas" />}
                        </div>
                    </SectionCard>

                    <SectionCard title="Peminjaman Kendaraan" href="#">
                        <div className="space-y-4">
                            {recentVehicleBorrowings.length ? recentVehicleBorrowings.map(v => (
                                <div key={v.id} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{v.user.name}</p>
                                            <StatusBadge status={v.status} />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{v.vehicle.name}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">{formatDateTime(v.created_at)}</p>
                                    </div>
                                </div>
                            )) : <EmptyState label="Belum ada aktivitas" />}
                        </div>
                    </SectionCard>

                    <SectionCard title="Pemesanan Ruangan" href="#">
                        <div className="space-y-4">
                            {recentBookingRooms.length ? recentBookingRooms.map(r => (
                                <div key={r.id} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{r.user.name}</p>
                                            <StatusBadge status={r.status} />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{r.room.name}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">{formatDateTime(r.created_at)}</p>
                                    </div>
                                </div>
                            )) : <EmptyState label="Belum ada aktivitas" />}
                        </div>
                    </SectionCard>
                </div>

                {/* ================= USER DATA ================= */}
                <div className="rounded-3xl bg-gray-50 p-6 dark:bg-gray-900/40">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-8 w-1 rounded-full bg-blue-600" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Aktivitas Saya</h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Barang Saya</p>
                            <ul className="space-y-4">
                                {userBorrowings.length ? userBorrowings.map(b => (
                                    <li key={b.id} className="group border-l-2 border-blue-500 pl-4 transition-colors hover:border-blue-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {b.borrowing_details?.map(d => d.inventory.name).join(', ')}
                                            </p>
                                            <StatusBadge status={b.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400">{formatDateTime(b.created_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic">Tidak ada peminjaman</p>}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Kendaraan Saya</p>
                            <ul className="space-y-4">
                                {userVehicleBorrowings.length ? userVehicleBorrowings.map(v => (
                                    <li key={v.id} className="group border-l-2 border-emerald-500 pl-4 transition-colors hover:border-emerald-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {v.vehicle.name}
                                            </p>
                                            <StatusBadge status={v.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400">{formatDateTime(v.created_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic">Tidak ada peminjaman kendaraan</p>}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Ruangan Saya</p>
                            <ul className="space-y-4">
                                {userBookingRooms.length ? userBookingRooms.map(r => (
                                    <li key={r.id} className="group border-l-2 border-purple-500 pl-4 transition-colors hover:border-purple-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {r.room.name}
                                            </p>
                                            <StatusBadge status={r.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400">{formatDateTime(r.created_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic">Tidak ada pemesanan ruangan</p>}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}