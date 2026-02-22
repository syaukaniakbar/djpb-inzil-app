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
    AlertCircle,
    PlusCircle,
    ArrowRight,
    CheckCircle2,
    ShoppingBag,
    Boxes,
} from 'lucide-react';
import { Link } from '@inertiajs/react';

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

interface ConsumableBorrowing {
    id: number;
    user: { name: string };
    consumable_item: { name: string };
    quantity: number;
    borrowed_at: string;
    status: LoanStatus;
}

interface Stats {
    activeBorrowings: number;
    activeVehicleBorrowings: number;
    activeBookingRooms: number;
    totalInventories: number;
    totalVehicles: number;
    totalRooms: number;
    totalConsumables: number;
    availableInventories: number;
    availableVehicles: number;
    availableRooms: number;
    lowStockConsumables: number;
}

interface PageProps extends InertiaPageProps {
    stats: Stats;
    pendingApprovalsCount: number;
    overdueCount: number;
    recentBorrowings: Borrowing[];
    recentVehicleBorrowings: VehicleBorrowing[];
    recentBookingRooms: BookingRoom[];
    recentConsumableBorrowings: ConsumableBorrowing[];
    userBorrowings: Borrowing[];
    userVehicleBorrowings: VehicleBorrowing[];
    userBookingRooms: BookingRoom[];
    userConsumableBorrowings: ConsumableBorrowing[];
}

const StatCard = ({
    title,
    value,
    icon: Icon,
    colorClass,
    subtext,
}: {
    title: string;
    value: number;
    icon: any;
    colorClass: string;
    subtext?: string;
}) => (
    <div className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md dark:bg-gray-900 dark:ring-gray-700">
        <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClass} bg-opacity-10 transition group-hover:bg-opacity-20`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-300">
                    {title}
                </p>
                <div className="flex items-baseline gap-2">
                    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                    {subtext && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">{subtext}</p>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const AlertsBanner = ({ pendingCount, overdueCount }: { pendingCount: number; overdueCount: number }) => {
    if (pendingCount === 0 && overdueCount === 0) return null;

    return (
        <div className="flex flex-col gap-4">
            {overdueCount > 0 && (
                <div className="flex items-center justify-between rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-100 dark:bg-rose-950/20 dark:ring-rose-900/40">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-rose-900 dark:text-rose-400">Ada {overdueCount} Peminjaman Terlambat</p>
                            <p className="text-sm text-rose-700 dark:text-rose-500">Beberapa barang/kendaraan/ruangan belum dikembalikan sesuai jadwal.</p>
                        </div>
                    </div>
                </div>
            )}
            {pendingCount > 0 && (
                <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 ring-1 amber-100 dark:bg-amber-950/20 dark:ring-amber-900/40">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-amber-900 dark:text-amber-400">{pendingCount} Pengajuan Menunggu Persetujuan</p>
                            <p className="text-sm text-amber-700 dark:text-amber-500">Cek dashboard Admin (Filament) untuk memproses pengajuan masuk.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ActionButton = ({ href, label, icon: Icon, colorClass }: { href: string; label: string; icon: any; colorClass: string }) => (
    <Link
        href={href}
        className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-blue-100 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900/50"
    >
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorClass} text-white shadow-lg transition group-hover:scale-110`}>
            <Icon size={24} />
        </div>
        <div className="text-center">
            <p className="font-bold text-gray-900 dark:text-white">{label}</p>
            <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Buat Sekarang <ArrowRight size={10} />
            </div>
        </div>
    </Link>
);

const SectionCard = ({ title, children, href }: { title: string; children: React.ReactNode; href?: string }) => (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-600 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-50 p-5 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="p-5">{children}</div>
    </div>
);

const EmptyState = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400 dark:text-gray-400/80">
        <History size={32} className="mb-2 opacity-20" />
        <p className="text-sm italic">{label}</p>
    </div>
);

export default function Dashboard() {
    const {
        stats,
        pendingApprovalsCount,
        overdueCount,
        recentBorrowings,
        recentVehicleBorrowings,
        recentBookingRooms,
        recentConsumableBorrowings,
        userBorrowings,
        userVehicleBorrowings,
        userBookingRooms,
        userConsumableBorrowings
    } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl space-y-10 p-6">

                {/* ================= ALERTS ================= */}
                <AlertsBanner pendingCount={pendingApprovalsCount} overdueCount={overdueCount} />

                {/* ================= QUICK ACTIONS ================= */}
                <section>
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Aksi Cepat</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <ActionButton href="/borrowings/create" label="Pinjam Barang" icon={Box} colorClass="bg-blue-600" />
                        <ActionButton href="/vehicle-borrowings/create" label="Pinjam Kendaraan" icon={Car} colorClass="bg-emerald-600" />
                        <ActionButton href="/booking-rooms/create" label="Booking Ruangan" icon={DoorOpen} colorClass="bg-purple-600" />
                        <ActionButton href="/consumable-borrowings/create" label="Persediaan" icon={ShoppingBag} colorClass="bg-amber-600" />
                    </div>
                </section>

                {/* ================= STATS GRID ================= */}
                <section>
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Ketersediaan & Statistik</h2>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Barang Inventaris"
                            value={stats.availableInventories}
                            subtext={`dari total ${stats.totalInventories}`}
                            icon={PackageCheck}
                            colorClass="bg-blue-500 text-blue-600"
                        />
                        <StatCard
                            title="Kendaraan Dinas"
                            value={stats.availableVehicles}
                            subtext={`dari total ${stats.totalVehicles}`}
                            icon={Car}
                            colorClass="bg-emerald-500 text-emerald-600"
                        />
                        <StatCard
                            title="Ruangan Rapat"
                            value={stats.availableRooms}
                            subtext={`dari total ${stats.totalRooms}`}
                            icon={CalendarCheck}
                            colorClass="bg-purple-500 text-purple-600"
                        />
                        <StatCard
                            title="Persediaan"
                            value={stats.totalConsumables}
                            subtext={`${stats.lowStockConsumables} stok menipis`}
                            icon={Boxes}
                            colorClass="bg-amber-500 text-amber-600"
                        />
                    </div>
                </section>

                {/* ================= RECENT ACTIVITIES ================= */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <SectionCard title="Peminjaman Barang" href="#">
                        <div className="space-y-4">
                            {recentBorrowings.length ? recentBorrowings.map(b => (
                                <div key={b.id} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{b.user.name}</p>
                                            <StatusBadge status={b.status} />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
                                            {b.borrowing_details?.map(d => d.inventory.name).join(', ') || '-'}
                                        </p>
                                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-400/80 uppercase font-medium">Start : {formatDateTime(b.start_at)}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-400/80 uppercase font-medium">End : {formatDateTime(b.end_at)}</p>
                                    </div>
                                </div>
                            )) : <EmptyState label="Belum ada aktivitas" />}
                        </div>
                    </SectionCard>

                    <SectionCard title="Peminjaman Kendaraan" href="#">
                        <div className="space-y-4">
                            {recentVehicleBorrowings.length ? recentVehicleBorrowings.map(v => (
                                <div key={v.id} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{v.user.name}</p>
                                            <StatusBadge status={v.status} />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">{v.vehicle.name}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-400/80 uppercase font-medium">Start : {formatDateTime(v.start_at)}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-400/80 uppercase font-medium">End : {formatDateTime(v.end_at)}</p>
                                    </div>
                                </div>
                            )) : <EmptyState label="Belum ada aktivitas" />}
                        </div>
                    </SectionCard>

                    <SectionCard title="Pemesanan Ruangan" href="#">
                        <div className="space-y-4">
                            {recentBookingRooms.length ? recentBookingRooms.map(r => (
                                <div key={r.id} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{r.user.name}</p>
                                            <StatusBadge status={r.status} />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">{r.room.name}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-400/80 uppercase font-medium">Start : {formatDateTime(r.start_at)}</p>
                                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-400/80 uppercase font-medium">End : {formatDateTime(r.end_at)}</p>
                                    </div>
                                </div>
                            )) : <EmptyState label="Belum ada aktivitas" />}
                        </div>
                    </SectionCard>

                    <SectionCard title="Persediaan" href="#">
                        <div className="space-y-4">
                            {recentConsumableBorrowings.length ? recentConsumableBorrowings.map(c => (
                                <div key={c.id} className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{c.user.name}</p>
                                            <StatusBadge status={c.status} />
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            {c.consumable_item.name} ({c.quantity})
                                        </p>
                                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-400/80 uppercase font-medium">Waktu : {formatDateTime(c.borrowed_at)}</p>
                                    </div>
                                </div>
                            )) : <EmptyState label="Belum ada aktivitas" />}
                        </div>
                    </SectionCard>
                </div>

                {/* ================= USER DATA ================= */}
                <div className="rounded-3xl bg-gray-50 p-6 dark:bg-gray-950/50">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-8 w-1 rounded-full bg-blue-600" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Aktivitas Saya</h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300">Inventaris</p>
                            <ul className="space-y-4">
                                {userBorrowings.length ? userBorrowings.map(b => (
                                    <li key={b.id} className="group border-l-2 border-blue-500 pl-4 transition-colors hover:border-blue-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {b.borrowing_details?.map(d => d.inventory.name).join(', ')}
                                            </p>
                                            <StatusBadge status={b.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400/80">Start : {formatDateTime(b.start_at)}</p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400/80">End : {formatDateTime(b.end_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic dark:text-gray-400/80">Tidak ada peminjaman</p>}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300">Kendaraan</p>
                            <ul className="space-y-4">
                                {userVehicleBorrowings.length ? userVehicleBorrowings.map(v => (
                                    <li key={v.id} className="group border-l-2 border-emerald-500 pl-4 transition-colors hover:border-emerald-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {v.vehicle.name}
                                            </p>
                                            <StatusBadge status={v.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400/80">Start : {formatDateTime(v.start_at)}</p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400/80">End : {formatDateTime(v.end_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic dark:text-gray-400/80">Tidak ada peminjaman kendaraan</p>}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300">Ruangan</p>
                            <ul className="space-y-4">
                                {userBookingRooms.length ? userBookingRooms.map(r => (
                                    <li key={r.id} className="group border-l-2 border-purple-500 pl-4 transition-colors hover:border-purple-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {r.room.name}
                                            </p>
                                            <StatusBadge status={r.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400/80">Start : {formatDateTime(r.start_at)}</p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400/80">End : {formatDateTime(r.end_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic dark:text-gray-400/80">Tidak ada pemesanan</p>}
                            </ul>
                        </div>

                        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
                            <p className="mb-4 text-sm font-bold text-gray-400 uppercase tracking-widest dark:text-gray-300">Persediaan</p>
                            <ul className="space-y-4">
                                {userConsumableBorrowings.length ? userConsumableBorrowings.map(c => (
                                    <li key={c.id} className="group border-l-2 border-amber-500 pl-4 transition-colors hover:border-amber-700">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {c.consumable_item.name} ({c.quantity})
                                            </p>
                                            <StatusBadge status={c.status} />
                                        </div>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-400/80">Waktu : {formatDateTime(c.borrowed_at)}</p>
                                    </li>
                                )) : <p className="text-xs text-gray-400 italic dark:text-gray-400/80">Tidak ada peminjaman</p>}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
