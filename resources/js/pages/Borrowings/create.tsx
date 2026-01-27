import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, ClipboardList, Send } from 'lucide-react';

/* =======================
 * Interfaces (Tetap Sama)
 * ======================= */
interface Inventory {
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
    end_at: string;
    notes: string;
    items: BorrowingItem[];
}

interface Props {
    inventories: Inventory[];
}

export default function BorrowingCreate({ inventories }: Props) {
    const { data, setData, post, processing, errors } =
        useForm<BorrowingFormData>({
            start_at: '',
            end_at: '',
            notes: '',
            items: [
                {
                    inventory_id: null,
                    quantity: 1,
                    notes: '',
                },
            ],
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
        post('/borrowings/store');
    };

    return (
        <AppLayout>
            <Head title="Peminjaman Barang" />

            <div className="min-h-screen bg-[#f8fafc] px-3 py-6 md:px-6 md:py-12">
                <div className="mx-auto max-w-4xl">
                    {/* Back Button - Dibuat lebih lebar target kliknya untuk mobile */}
                    <a
                        href="/borrowings"
                        className="mb-6 inline-flex items-center p-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-1 h-4 w-4"
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
                    </a>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 md:rounded-2xl">
                        {/* Header Section - Ukuran teks responsif */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Form Peminjaman Barang
                            </h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Lengkapi detail di bawah untuk pengajuan
                                peminjaman barang.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-8 md:p-10"
                        >
                            <div className="space-y-8 md:space-y-12">
                                {/* Section 1: Waktu */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-balance text-gray-800">
                                            Periode Peminjaman
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Tanggal & Waktu Mulai
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
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${errors.start_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.start_at && (
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.start_at}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Tanggal & Waktu Selesai
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
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${errors.end_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.end_at && (
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.end_at}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Tujuan / Catatan Umum
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={data.notes}
                                                onChange={(e) =>
                                                    setData(
                                                        'notes',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Contoh: Untuk keperluan dokumentasi event gathering..."
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Daftar Barang */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3">
                                        <ClipboardList className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800">
                                            Barang yang Dipinjam
                                        </h2>
                                    </div>
                                    <div className="space-y-4">
                                        {data.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="group relative grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50/30 p-5 transition-all hover:border-blue-200 hover:bg-white md:grid-cols-12"
                                            >
                                                <div className="md:col-span-6">
                                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                        Pilih Barang
                                                    </label>
                                                    <select
                                                        value={
                                                            item.inventory_id ??
                                                            ''
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(
                                                                index,
                                                                'inventory_id',
                                                                e.target.value
                                                                    ? Number(
                                                                          e
                                                                              .target
                                                                              .value,
                                                                      )
                                                                    : null,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                        required
                                                    >
                                                        <option value="">
                                                            Pilih Barang...
                                                        </option>
                                                        {inventories.map(
                                                            (inv) => (
                                                                <option
                                                                    key={inv.id}
                                                                    value={
                                                                        inv.id
                                                                    }
                                                                >
                                                                    {inv.name}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                        Jumlah
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
                                                                    e.target
                                                                        .value,
                                                                ) || 1,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-center text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                        required
                                                    />
                                                </div>

                                                <div className="md:col-span-4">
                                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                        Keterangan Barang
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
                                                        placeholder="Kondisi, spesifikasi, dll"
                                                        className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                    />
                                                </div>

                                                {/* Delete Button */}
                                                {data.items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeItem(index)
                                                        }
                                                        className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-red-100 bg-white text-red-500 shadow-sm transition-all hover:bg-red-500 hover:text-white md:opacity-0 md:group-hover:opacity-100"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addItem}
                                            className="mt-4 inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mr-1 h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                            Tambah Barang
                                        </button>

                                        {errors.items && (
                                            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <span>
                                                    Pastikan semua barang dan
                                                    jumlah telah diisi dengan
                                                    benar.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            {/* Action Buttons - Dioptimalkan untuk Mobile (Stack vertical di HP) */}
                            <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 md:mt-14 md:flex-row md:items-center md:justify-end md:gap-4">
                                <a
                                    href="/borrowings"
                                    className="order-2 flex h-12 items-center justify-center px-6 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-700 md:order-1"
                                >
                                    Batalkan Pengajuan
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="order-1 flex h-12 items-center justify-center rounded-xl bg-blue-600 px-10 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] disabled:opacity-70 md:order-2 md:h-14"
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="mr-2 h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            Ajukan Peminjaman
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
