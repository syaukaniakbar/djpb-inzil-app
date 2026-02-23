import { Link, router } from '@inertiajs/react';
import formatDateTime from '@/utils/date';

interface ActionCellProps {
    id: number;
    status: string;
    baseRoute: string;
    adminPhone: string;
    userName?: string;
    itemName?: string;
    borrowedAt?: string;
    returnedAt?: string | null;
    hasReturnAction?: boolean;
    returnLabel?: string;
    whatsappMessage: string;
}

export function ActionCell({
    id,
    status,
    baseRoute,
    adminPhone,
    userName = 'Tidak Diketahui',
    itemName = 'Tidak Diketahui',
    borrowedAt,
    returnedAt,
    hasReturnAction = false,
    returnLabel = 'Kembalikan',
    whatsappMessage,
}: ActionCellProps) {
    const handleCancel = () => {
        if (confirm('Apakah Anda yakin ingin membatalkan peminjaman ini?')) {
            router.patch(`${baseRoute}/${id}/cancel`);
        }
    };

    const handleReturn = () => {
        if (confirm(`Apakah Anda yakin ${returnLabel.toLowerCase()} sudah dikembalikan?`)) {
            router.patch(`${baseRoute}/${id}/return`);
        }
    };

    return (
        <div className="flex flex-col gap-1.5">
            {/* Detail - Always visible */}
            <Link
                href={`${baseRoute}/${id}`}
                className="cursor-pointer w-full text-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 shadow-sm"
            >
                Detail
            </Link>

            {/* Actions for pending status */}
            {status === 'pending' && (
                <>
                    <Link
                        href={`${baseRoute}/${id}/edit`}
                        className="cursor-pointer w-full text-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Ubah
                    </Link>

                    <a
                        href={`https://wa.me/${adminPhone}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer w-full text-center rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 dark:border-green-700 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700"
                    >
                        WhatsApp Admin
                    </a>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="cursor-pointer w-full text-center text-xs font-medium text-red-600 hover:underline dark:text-red-400"
                    >
                        Batalkan
                    </button>
                </>
            )}

            {/* Return action for ongoing status */}
            {hasReturnAction && status === 'ongoing' && !returnedAt && (
                <button
                    type="button"
                    onClick={handleReturn}
                    className="cursor-pointer w-full text-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 shadow-sm"
                >
                    {returnLabel}
                </button>
            )}
        </div>
    );
}
