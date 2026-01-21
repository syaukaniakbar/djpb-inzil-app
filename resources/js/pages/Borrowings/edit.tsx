import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

/* =======================
 * Interfaces (from index.tsx and create.tsx)
 * ======================= */

interface Inventory {
    id: number;
    name: string;
}

interface BorrowingDetail {
    id: number;
    quantity: number;
    notes: string | null;
    inventory_id: number;
}

interface User {
    id: number;
    name: string;
}

interface BorrowingItem {
    inventory_id: number | null;
    quantity: number;
    notes?: string;
}

interface BorrowingFormData {
    start_at: string;
    end_at: string | null;
    notes: string;
    items: BorrowingItem[];
}

interface Props {
    borrowing: {
        id: number;
        start_at: string;
        end_at: string | null;
        returned_at: string | null;
        status: string;
        notes: string;
        user: User;
        borrowing_details: BorrowingDetail[];
    };
    inventories: Inventory[];
}

/* =======================
 * Helper Functions
 * ======================= */

// Helper function to format datetime for datetime-local input
const formatDateTimeLocal = (dateTimeString: string | null): string => {
    if (!dateTimeString) return '';

    const date = new Date(dateTimeString);
    // Convert to local timezone and format as YYYY-MM-DDTHH:mm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/* =======================
 * Component
 * ======================= */

export default function BorrowingEdit({ borrowing, inventories }: Props) {
    const { data, setData, put, processing, errors } = useForm<BorrowingFormData>({
        start_at: formatDateTimeLocal(borrowing.start_at),
        end_at: formatDateTimeLocal(borrowing.end_at),
        notes: borrowing.notes || '',
        items: borrowing.borrowing_details.map(detail => ({
            inventory_id: detail.inventory_id,
            quantity: detail.quantity,
            notes: detail.notes || ''
        })),
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            { inventory_id: null, quantity: 1, notes: '' },
        ]);
    };

    const removeItem = (index: number) => {
        if (data.items.length <= 1) return;

        setData(
            'items',
            data.items.filter((_, i) => i !== index),
        );
    };

    const updateItem = <K extends keyof BorrowingItem>(
        index: number,
        field: K,
        value: BorrowingItem[K],
    ) => {
        const items = [...data.items];
        items[index] = { ...items[index], [field]: value };
        setData('items', items);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/borrowings/${borrowing.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Peminjaman Barang" />

            <div className="flex min-h-screen justify-center bg-gray-50 p-4">
                <div className="w-full max-w-6xl px-4">
                    <div className="rounded-xl border bg-white p-6 shadow-lg">
                        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                            Edit Form Peminjaman Barang
                        </h1>
                        <p className="mb-6 text-center text-gray-600">
                            Silakan edit form berikut untuk memperbarui peminjaman barang.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Tanggal */}
                            <section className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-700">
                                    Tanggal Peminjaman
                                </h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block font-medium text-gray-700">
                                            Tanggal Mulai *
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={data.start_at}
                                            onChange={(e) =>
                                                setData(
                                                    'start_at',
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-400 md:py-3 ${
                                                errors.start_at
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                            required
                                        />
                                        {errors.start_at && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.start_at}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1 block font-medium text-gray-700">
                                            Tanggal Selesai
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={data.end_at}
                                            onChange={(e) =>
                                                setData(
                                                    'end_at',
                                                    e.target.value,
                                                )
                                            }
                                            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-400 md:py-3 ${
                                                errors.end_at
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.end_at && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.end_at}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Catatan */}
                            <section className="space-y-2">
                                <label className="block font-medium text-gray-700">
                                    Catatan Peminjaman
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData('notes', e.target.value)
                                    }
                                    placeholder="Misal: Untuk keperluan pribadi, proyek, maupun kegiatan dinas"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 md:py-3"
                                />
                                {errors.notes && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.notes}
                                    </p>
                                )}
                            </section>

                            {/* Daftar Barang */}
                            <section className="space-y-4">
                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                    <h2 className="text-xl font-semibold text-gray-700">
                                        Barang yang Dipinjam
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="flex cursor-pointer items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 md:text-base"
                                    >
                                        + Tambah Barang
                                    </button>
                                </div>

                                {data.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative grid grid-cols-1 gap-3 rounded border bg-gray-50 p-4 md:grid-cols-12"
                                    >
                                        {/* Inventory */}
                                        <div className="md:col-span-5">
                                            <label className="mb-1 block font-medium text-gray-700">
                                                Barang *
                                            </label>
                                            <select
                                                value={item.inventory_id ?? ''}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        'inventory_id',
                                                        e.target.value
                                                            ? Number(
                                                                  e.target
                                                                      .value,
                                                              )
                                                            : null,
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                                required
                                            >
                                                <option value="">
                                                    Pilih Barang
                                                </option>
                                                {inventories.map((inv) => (
                                                    <option
                                                        key={inv.id}
                                                        value={inv.id}
                                                    >
                                                        {inv.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Quantity */}
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block font-medium text-gray-700">
                                                Jumlah *
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        'quantity',
                                                        Number(
                                                            e.target.value,
                                                        ) || 1,
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                                required
                                            />
                                        </div>

                                        {/* Notes */}
                                        <div className="md:col-span-4">
                                            <label className="mb-1 block font-medium text-gray-700">
                                                Catatan Barang
                                            </label>
                                            <input
                                                type="text"
                                                value={item.notes ?? ''}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        'notes',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Berikan Keterangan (Opsional)"
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>

                                        {/* Remove */}
                                        {data.items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(index)
                                                }
                                                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
                                                title="Hapus barang ini"
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </section>

                            <div className="flex flex-col gap-3 md:flex-row md:justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full cursor-pointer rounded bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 md:w-auto"
                                >
                                    {processing
                                        ? 'Memproses...'
                                        : 'Perbarui Peminjaman'}
                                </button>

                                <Link
                                    href="/borrowings"
                                    className="w-full cursor-pointer rounded border px-5 py-3 text-center text-gray-700 transition hover:bg-gray-100 md:w-auto"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}