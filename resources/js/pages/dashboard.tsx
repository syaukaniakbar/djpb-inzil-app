import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';
import { StatusBadge, LoanStatus } from '@/components/custom/status-badge';
import formatDateTime from '@/utils/date';

import {
    Box,
    Car,
    DoorOpen,
    History,
    PackageCheck,
    CalendarCheck,
} from 'lucide-react';


interface Borrowing {
    id: number;
    user: { name: string };
    borrowing_details?: { inventory: { name: string } }[];
    start_at: string;
    end_at: string;
    status: LoanStatus;
}

interface VehicleBorrowing {
    id: number;
    user: { name: string };
    vehicle: { name: string };
    start_at: string;
    end_at: string;
    status: LoanStatus;
}

interface BookingRoom {
    id: number;
    user: { name: string };
    room: { name: string };
    start_at: string;
    end_at: string;
    status: LoanStatus;
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


export default function Dashboard() {
    const { stats, recentBorrowings, recentVehicleBorrowings, recentBookingRooms, userBorrowings, userVehicleBorrowings, userBookingRooms } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

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
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">Start : {formatDateTime(b.start_at)}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">End : {formatDateTime(b.end_at)}</p>
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
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">Start : {formatDateTime(v.start_at)}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">End : {formatDateTime(v.end_at)}</p>
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
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">Start : {formatDateTime(r.start_at)}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 uppercase font-medium">End : {formatDateTime(r.end_at)}</p>
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
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Peminjaman Barang</p>
                            <ul className="space-y-4">
                                {userBorrowings.length ? userBorrowings.map(b => (
                                    <li key={b.id} className="group border-l-2 border-blue-500 pl-4 transition-colors hover:border-blue-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {b.borrowing_details?.map(d => d.inventory.name).join(', ')}
                                            </p>
                                            <StatusBadge status={b.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400">Start : {formatDateTime(b.start_at)}</p>
                                        <p className="text-[11px] text-gray-400">End : {formatDateTime(b.end_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic">Tidak ada peminjaman</p>}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Peminjaman Kendaraan</p>
                            <ul className="space-y-4">
                                {userVehicleBorrowings.length ? userVehicleBorrowings.map(v => (
                                    <li key={v.id} className="group border-l-2 border-emerald-500 pl-4 transition-colors hover:border-emerald-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {v.vehicle.name}
                                            </p>
                                            <StatusBadge status={v.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400">Start : {formatDateTime(v.start_at)}</p>
                                        <p className="text-[11px] text-gray-400">End : {formatDateTime(v.end_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic">Tidak ada peminjaman kendaraan</p>}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Peminjaman Ruangan</p>
                            <ul className="space-y-4">
                                {userBookingRooms.length ? userBookingRooms.map(r => (
                                    <li key={r.id} className="group border-l-2 border-purple-500 pl-4 transition-colors hover:border-purple-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {r.room.name}
                                            </p>
                                            <StatusBadge status={r.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400">Start : {formatDateTime(r.start_at)}</p>
                                        <p className="text-[11px] text-gray-400">End : {formatDateTime(r.end_at)}</p>
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