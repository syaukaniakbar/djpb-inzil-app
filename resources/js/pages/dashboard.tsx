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
    ArrowRight,
    ShoppingBag,
    Package,
    Layers,
    PackageCheck,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion, type Variants } from 'motion/react';

// Animation variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Interfaces
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
    event_name?: string;
}

interface ConsumableBorrowing {
    id: number;
    user: { name: string };
    consumable_item: { name: string };
    quantity: number;
    borrowed_at: string;
    status: LoanStatus;
}

interface StatusBreakdown {
    borrowings: Record<string, number>;
    vehicleBorrowings: Record<string, number>;
    bookingRooms: Record<string, number>;
    consumableBorrowings: Record<string, number>;
}

interface PageProps extends InertiaPageProps {
    statusBreakdown: StatusBreakdown;
    topBorrowedItems: {
        inventories: { id: number; name: string; category: string; borrow_count: number }[];
        vehicles: { id: number; name: string; license_plate: string; borrow_count: number }[];
        rooms: { id: number; name: string; capacity: number; booking_count: number }[];
        consumables: { id: number; name: string; sku: string; total_quantity: number }[];
    };
    userActivities: {
        borrowings: Borrowing[];
        vehicleBorrowings: VehicleBorrowing[];
        bookingRooms: BookingRoom[];
        consumableBorrowings: ConsumableBorrowing[];
    };
}

const ActionButton = ({
    href,
    label,
    icon: Icon,
    colorClass
}: {
    href: string;
    label: string;
    icon: React.ElementType;
    colorClass: string
}) => (
    <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={scaleIn}
    >
        <Link
            href={href}
            className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900/40 sm:p-6"
        >
            {/* Decorative background glow on hover */}
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-10 ${colorClass} blur-3xl`} />

            {/* Icon Container with motion */}
            <motion.div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${colorClass} text-white shadow-lg sm:h-16 sm:w-16`}
                variants={{
                    hidden: { scale: 1 },
                    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } }
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
            </motion.div>

            {/* Text Content */}
            <div className="flex flex-col items-center text-center">
                <motion.p
                    className="text-sm font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-base"
                    variants={{
                        hidden: { y: 0 },
                        hover: { y: -2, transition: { duration: 0.2 } }
                    }}
                >
                    {label}
                </motion.p>

                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 sm:text-[11px]">
                    <span>Buat Sekarang</span>
                    <motion.span
                        variants={{
                            hidden: { x: 0 },
                            hover: { x: 3, transition: { duration: 0.2 } }
                        }}
                    >
                        <ArrowRight size={12} />
                    </motion.span>
                </div>
            </div>
        </Link>
    </motion.div>
);

const SectionCard = ({
    title,
    children,
    href,
    icon: Icon
}: {
    title: string;
    children: React.ReactNode;
    href?: string;
    icon?: React.ElementType
}) => {
    const CardContent = (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className={`flex h-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 ${href ? 'hover:border-gray-200 hover:shadow-md dark:hover:border-gray-700' : ''}`}
        >
            {/* Header */}
            <motion.div
                className="flex items-center gap-3 border-b border-gray-50/80 p-4 dark:border-gray-800/80"
                whileHover={href ? { backgroundColor: 'rgba(243, 244, 246, 0.5)' } : {}}
            >
                {Icon && (
                    <motion.div
                        className="flex items-center justify-center rounded-lg bg-gray-50 p-2 dark:bg-gray-800"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        <Icon size={18} className="text-gray-500 dark:text-gray-400" />
                    </motion.div>
                )}
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
            </motion.div>

            {/* Body */}
            <div className="flex-1 p-4">{children}</div>
        </motion.div>
    );

    // If an href is passed, wrap the card in an anchor tag for proper accessibility
    if (href) {
        return (
            <a href={href} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl">
                {CardContent}
            </a>
        );
    }

    return CardContent;
};

const EmptyState = ({ label }: { label: string }) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex flex-col items-center justify-center py-8 text-center text-gray-400 dark:text-gray-400/80"
    >
        <motion.div
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
            <History size={32} className="mb-2" />
        </motion.div>
        <p className="text-sm italic">{label}</p>
    </motion.div>
);

export default function Dashboard() {
    const {
        statusBreakdown,
        topBorrowedItems,
        userActivities,
    } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

    const statusColorMap: Record<string, string> = {
        pending: 'bg-amber-500',
        approved: 'bg-blue-500',
        ongoing: 'bg-purple-500',
        finished: 'bg-emerald-500',
        canceled: 'bg-gray-400',
        rejected: 'bg-rose-500',
    };

    const statusLabelMap: Record<string, string> = {
        pending: 'Menunggu',
        approved: 'Disetujui',
        ongoing: 'Berlangsung',
        finished: 'Selesai',
        canceled: 'Dibatalkan',
        rejected: 'Ditolak',
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <motion.div
                className="mx-auto max-w-7xl space-y-8 p-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* ================= QUICK ACTIONS ================= */}
                <motion.section variants={fadeInUp}>
                    <motion.div
                        className="mb-4 flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <ArrowRight size={16} />
                        </motion.div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Aksi Cepat</h2>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
                        variants={staggerContainer}
                    >
                        <ActionButton href="/borrowings/create" label="Pinjam Inventaris" icon={Box} colorClass="bg-blue-600" />
                        <ActionButton href="/vehicle-borrowings/create" label="Pinjam Kendaraan" icon={Car} colorClass="bg-emerald-600" />
                        <ActionButton href="/booking-rooms/create" label="Booking Ruangan" icon={DoorOpen} colorClass="bg-purple-600" />
                        <ActionButton href="/consumable-borrowings/create" label="Persediaan" icon={ShoppingBag} colorClass="bg-amber-600" />
                    </motion.div>
                </motion.section>

                {/* ================= TOP BORROWED ITEMS ================= */}
                <motion.section variants={fadeInUp}>
                    <motion.div
                        className="mb-4 flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <motion.div
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <PackageCheck size={16} />
                        </motion.div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Paling Sering Dipinjam</h2>
                    </motion.div>
                    <motion.div
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        variants={staggerContainer}
                    >
                        <SectionCard title="Inventaris" icon={Package}>
                            {topBorrowedItems.inventories.length > 0 ? (
                                <motion.div className="space-y-2" variants={staggerContainer}>
                                    {topBorrowedItems.inventories.slice(0, 5).map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            variants={slideInFromLeft}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm text-gray-700 dark:text-gray-300 max-w-[120px]">{item.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                {item.borrow_count}x
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <EmptyState label="Belum ada data" />
                            )}
                        </SectionCard>
                        <SectionCard title="Kendaraan" icon={Car}>
                            {topBorrowedItems.vehicles.length > 0 ? (
                                <motion.div className="space-y-2" variants={staggerContainer}>
                                    {topBorrowedItems.vehicles.slice(0, 5).map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            variants={slideInFromLeft}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                    {index + 1}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 max-w-[120px]">{item.name}</span>
                                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.license_plate}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                {item.borrow_count}x
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <EmptyState label="Belum ada data" />
                            )}
                        </SectionCard>
                        <SectionCard title="Ruangan" icon={DoorOpen}>
                            {topBorrowedItems.rooms.length > 0 ? (
                                <motion.div className="space-y-2" variants={staggerContainer}>
                                    {topBorrowedItems.rooms.slice(0, 5).map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            variants={slideInFromLeft}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm text-gray-700 dark:text-gray-300 max-w-[120px]">{item.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                {item.booking_count}x
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <EmptyState label="Belum ada data" />
                            )}
                        </SectionCard>
                        <SectionCard title="Persediaan" icon={ShoppingBag}>
                            {topBorrowedItems.consumables.length > 0 ? (
                                <motion.div className="space-y-2" variants={staggerContainer}>
                                    {topBorrowedItems.consumables.slice(0, 5).map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            variants={slideInFromLeft}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm text-gray-700 dark:text-gray-300 max-w-[120px]">{item.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                {item.total_quantity}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <EmptyState label="Belum ada data" />
                            )}
                        </SectionCard>
                    </motion.div>
                </motion.section>

                {/* ================= STATUS BREAKDOWN ================= */}
                <motion.section variants={fadeInUp}>
                    <motion.div
                        className="mb-4 flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <motion.div
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <Layers size={16} />
                        </motion.div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Status Peminjaman</h2>
                    </motion.div>
                    <motion.div
                        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                        variants={staggerContainer}
                    >
                        <SectionCard title="Inventaris" icon={Package}>
                            <motion.div className="space-y-2" variants={staggerContainer}>
                                {Object.entries(statusBreakdown.borrowings).map(([status, count]) => (
                                    <motion.div
                                        key={status}
                                        className="flex items-center justify-between"
                                        variants={slideInFromLeft}
                                        whileHover={{ x: 4, scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <motion.span
                                                className={`h-2 w-2 rounded-xs ${statusColorMap[status] || 'bg-gray-400'}`}
                                                whileHover={{ scale: 1.5 }}
                                            />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{statusLabelMap[status] || status}</span>
                                        </div>
                                        <motion.span
                                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                            whileHover={{ scale: 1.2, backgroundColor: '#3b82f6', color: '#fff' }}
                                        >
                                            {count}
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </SectionCard>
                        <SectionCard title="Kendaraan" icon={Car}>
                            <motion.div className="space-y-2" variants={staggerContainer}>
                                {Object.entries(statusBreakdown.vehicleBorrowings).map(([status, count]) => (
                                    <motion.div
                                        key={status}
                                        className="flex items-center justify-between"
                                        variants={slideInFromLeft}
                                        whileHover={{ x: 4, scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <motion.span
                                                className={`h-2 w-2 rounded-xs ${statusColorMap[status] || 'bg-gray-400'}`}
                                                whileHover={{ scale: 1.5 }}
                                            />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{statusLabelMap[status] || status}</span>
                                        </div>
                                        <motion.span
                                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                            whileHover={{ scale: 1.2, backgroundColor: '#10b981', color: '#fff' }}
                                        >
                                            {count}
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </SectionCard>
                        <SectionCard title="Ruangan" icon={DoorOpen}>
                            <motion.div className="space-y-2" variants={staggerContainer}>
                                {Object.entries(statusBreakdown.bookingRooms).map(([status, count]) => (
                                    <motion.div
                                        key={status}
                                        className="flex items-center justify-between"
                                        variants={slideInFromLeft}
                                        whileHover={{ x: 4, scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <motion.span
                                                className={`h-2 w-2 rounded-xs ${statusColorMap[status] || 'bg-gray-400'}`}
                                                whileHover={{ scale: 1.5 }}
                                            />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{statusLabelMap[status] || status}</span>
                                        </div>
                                        <motion.span
                                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                            whileHover={{ scale: 1.2, backgroundColor: '#8b5cf6', color: '#fff' }}
                                        >
                                            {count}
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </SectionCard>
                        <SectionCard title="Persediaan" icon={ShoppingBag}>
                            <motion.div className="space-y-2" variants={staggerContainer}>
                                {Object.entries(statusBreakdown.consumableBorrowings).map(([status, count]) => (
                                    <motion.div
                                        key={status}
                                        className="flex items-center justify-between"
                                        variants={slideInFromLeft}
                                        whileHover={{ x: 4, scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <motion.span
                                                className={`h-2 w-2 rounded-xs ${statusColorMap[status] || 'bg-gray-400'}`}
                                                whileHover={{ scale: 1.5 }}
                                            />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{statusLabelMap[status] || status}</span>
                                        </div>
                                        <motion.span
                                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                            whileHover={{ scale: 1.2, backgroundColor: '#f59e0b', color: '#fff' }}
                                        >
                                            {count}
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </SectionCard>
                    </motion.div>
                </motion.section>

                {/* ================= USER ACTIVITIES ================= */}
                <motion.section
                    className="rounded-2xl bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-950/50"
                    variants={fadeInUp}
                >
                    {/* Header - Improved spacing for mobile */}
                    <motion.div
                        className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <PackageCheck size={24} />
                        </motion.div>
                        <div className="space-y-0.5">
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                                Aktivitas Saya
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Pantau status riwayat peminjaman Anda secara real-time
                            </p>
                        </div>
                    </motion.div>

                    {/* Responsive Grid System: 1 col (mobile), 2 cols (tablet), 4 cols (desktop) */}
                    <motion.div
                        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
                        variants={staggerContainer}
                    >

                        {/* 1. Inventaris */}
                        <motion.div
                            className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
                            variants={fadeInUp}
                            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <motion.div
                                className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800"
                                whileHover={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                    <Package size={18} className="text-blue-600" />
                                </motion.div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-100">Inventaris</h4>
                            </motion.div>
                            <ul className="flex-1 space-y-4">
                                {userActivities.borrowings.length ? userActivities.borrowings.slice(0, 5).map((b, idx) => (
                                    <motion.li
                                        key={b.id}
                                        className="group border-l-2 border-blue-500 pl-3 transition-colors hover:border-blue-700"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                                        whileHover={{ x: 4, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="line-clamp-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {b.borrowing_details?.map(d => d.inventory.name).join(', ')}
                                            </p>
                                            <motion.div
                                                className="shrink-0 scale-90"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <StatusBadge status={b.status} />
                                            </motion.div>
                                        </div>
                                        <p className="mt-1 text-[11px] font-medium text-gray-400 dark:text-gray-500">
                                            {formatDateTime(b.start_at)}
                                        </p>
                                    </motion.li>
                                )) : <EmptyState label="Tidak ada peminjaman" />}
                            </ul>
                        </motion.div>

                        {/* 2. Kendaraan */}
                        <motion.div
                            className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
                            variants={fadeInUp}
                            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <motion.div
                                className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800"
                                whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                    <Car size={18} className="text-emerald-600" />
                                </motion.div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-100">Kendaraan</h4>
                            </motion.div>
                            <ul className="flex-1 space-y-4">
                                {userActivities.vehicleBorrowings.length ? userActivities.vehicleBorrowings.slice(0, 5).map((v, idx) => (
                                    <motion.li
                                        key={v.id}
                                        className="group border-l-2 border-emerald-500 pl-3 transition-colors hover:border-emerald-700"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                                        whileHover={{ x: 4, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="line-clamp-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {v.vehicle.name}
                                            </p>
                                            <motion.div
                                                className="shrink-0 scale-90"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <StatusBadge status={v.status} />
                                            </motion.div>
                                        </div>
                                        <p className="mt-1 text-[11px] font-medium text-gray-400 dark:text-gray-500">
                                            {formatDateTime(v.start_at)}
                                        </p>
                                    </motion.li>
                                )) : <EmptyState label="Tidak ada peminjaman" />}
                            </ul>
                        </motion.div>

                        {/* 3. Ruangan */}
                        <motion.div
                            className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
                            variants={fadeInUp}
                            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <motion.div
                                className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800"
                                whileHover={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                    <DoorOpen size={18} className="text-purple-600" />
                                </motion.div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-100">Ruangan</h4>
                            </motion.div>
                            <ul className="flex-1 space-y-4">
                                {userActivities.bookingRooms.length ? userActivities.bookingRooms.slice(0, 5).map((r, idx) => (
                                    <motion.li
                                        key={r.id}
                                        className="group border-l-2 border-purple-500 pl-3 transition-colors hover:border-purple-700"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                                        whileHover={{ x: 4, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="line-clamp-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {r.room.name}
                                            </p>
                                            <motion.div
                                                className="shrink-0 scale-90"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <StatusBadge status={r.status} />
                                            </motion.div>
                                        </div>
                                        <p className="mt-1 text-[11px] font-medium text-gray-400 dark:text-gray-500">
                                            {formatDateTime(r.start_at)}
                                        </p>
                                    </motion.li>
                                )) : <EmptyState label="Tidak ada pemesanan" />}
                            </ul>
                        </motion.div>

                        {/* 4. Persediaan */}
                        <motion.div
                            className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
                            variants={fadeInUp}
                            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <motion.div
                                className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 dark:border-gray-800"
                                whileHover={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                >
                                    <ShoppingBag size={18} className="text-amber-600" />
                                </motion.div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-100">Persediaan</h4>
                            </motion.div>
                            <ul className="flex-1 space-y-4">
                                {userActivities.consumableBorrowings.length ? userActivities.consumableBorrowings.slice(0, 5).map((c, idx) => (
                                    <motion.li
                                        key={c.id}
                                        className="group border-l-2 border-amber-500 pl-3 transition-colors hover:border-amber-700"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.08, duration: 0.3 }}
                                        whileHover={{ x: 4, backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="line-clamp-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                {c.consumable_item.name} ({c.quantity})
                                            </p>
                                            <motion.div
                                                className="shrink-0 scale-90"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <StatusBadge status={c.status} />
                                            </motion.div>
                                        </div>
                                        <p className="mt-1 text-[11px] font-medium text-gray-400 dark:text-gray-500">
                                            {formatDateTime(c.borrowed_at)}
                                        </p>
                                    </motion.li>
                                )) : <EmptyState label="Tidak ada peminjaman" />}
                            </ul>
                        </motion.div>
                    </motion.div>
                </motion.section>
            </motion.div>
        </AppLayout>
    );
}
