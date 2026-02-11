export type LoanStatus =
    | 'pending'
    | 'approved'
    | 'ongoing'
    | 'finished'
    | 'rejected'
    | 'canceled';

type StatusBadgeProps = {
    status: LoanStatus;
    size?: 'sm';
};

const STATUS_MAP: Record<
    LoanStatus,
    { label: string; className: string }
> = {
    pending: {
        label: 'Menunggu',
        className: 'bg-yellow-100 text-yellow-700',
    },
    approved: {
        label: 'Disetujui',
        className: 'bg-blue-100 text-blue-700',
    },
    ongoing: {
        label: 'Digunakan',
        className: 'bg-indigo-100 text-indigo-700',
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

export const StatusBadge = ({
    status,
    size = 'sm',
}: StatusBadgeProps) => {
    const badge = STATUS_MAP[status];

    const sizeClass =
        size === 'sm'
            ? 'px-2 py-0.5 text-xs'
            : 'px-3 py-1 text-sm';

    return (
        <span
            className={`inline-flex items-center gap-2 rounded font-medium ${sizeClass} ${badge.className}`}
        >
            <span
                className="h-2 w-2 rounded-full bg-current opacity-70"
                aria-hidden
            />
            {badge.label}
        </span>

    );
};
