import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Calendar, Package, Send } from 'lucide-react';
import type { ConsumableBorrowingFormData, ConsumableBorrowingEditProps } from '@/types/consumable-borrowing';
import type { AvailableConsumableItem } from '@/types/consumable-item';

// Helper function to format datetime for datetime-local input
const formatDateTimeLocal = (dateTimeString: string | null): string => {
    if (!dateTimeString) return '';

    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function ConsumableBorrowingEdit({ consumableItems, borrowing }: ConsumableBorrowingEditProps) {
    const { data, setData, put, processing, errors } =
        useForm<ConsumableBorrowingFormData>({
            borrowed_at: formatDateTimeLocal(borrowing.borrowed_at),
            consumable_item_id: borrowing.consumable_item_id,
            quantity: borrowing.quantity,
            notes: borrowing.notes || '',
        });

    // Helper function to get available quantity for a consumable item
    const getAvailableQuantity = (itemId: number | null): number => {
        if (!itemId) return 0;
        const item = consumableItems.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    };

    // Helper function to validate quantity against available stock
    const validateQuantity = (itemId: number | null, quantity: number): boolean => {
        if (!itemId || quantity <= 0) return false;
        const available = getAvailableQuantity(itemId);
        return quantity <= available;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.consumable_item_id) {
            alert('Harap pilih barang yang ingin dipinjam.');
            return;
        }

        if (!validateQuantity(data.consumable_item_id, data.quantity)) {
            alert('Jumlah barang yang diminta melebihi jumlah yang tersedia. Silakan periksa kembali.');
            return;
        }

        put(`/consumable-borrowings/${borrowing.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Peminjaman Persediaan" />

            <div className="min-h-screen bg-[#f8fafc] px-3 py-6 md:px-6 md:py-12 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">
                    {/* Back Button */}
                    <Link
                        href="/consumable-borrowings"
                        className="mb-6 inline-flex items-center p-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
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
                    </Link>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 md:rounded-2xl dark:border-gray-800 dark:bg-gray-900">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Edit Form Peminjaman Persediaan
                            </h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Silakan edit form berikut untuk memperbarui peminjaman persediaan.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-8 md:p-10"
                        >
                            <div className="space-y-8 md:space-y-12">
                                {/* Section 1: Waktu & Barang */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-balance text-gray-800 dark:text-white">
                                            Informasi Peminjaman
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Tanggal & Waktu Peminjaman
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={data.borrowed_at}
                                                onChange={(e) =>
                                                    setData(
                                                        'borrowed_at',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900 ${errors.borrowed_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.borrowed_at && (
                                                <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">
                                                    {errors.borrowed_at}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Pilih Barang
                                            </label>
                                            <select
                                                value={
                                                    data.consumable_item_id ? data.consumable_item_id.toString() : ''
                                                }
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    const newItemId = selectedValue ? Number(selectedValue) : null;

                                                    // Adjust quantity if it exceeds available stock
                                                    let newQuantity = data.quantity;
                                                    if (newItemId) {
                                                        const available = getAvailableQuantity(newItemId);
                                                        newQuantity = Math.min(data.quantity, available);
                                                    }

                                                    setData('consumable_item_id', newItemId);
                                                    setData('quantity', newQuantity);
                                                }}
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900 ${errors.consumable_item_id ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            >
                                                <option value="">
                                                    Pilih Barang...
                                                </option>
                                                {consumableItems.map(
                                                    (item) => (
                                                        <option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.name} {item.sku && `(${item.sku})`} - Tersedia: {item.quantity}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                            {errors.consumable_item_id && (
                                                <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">
                                                    {errors.consumable_item_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Jumlah & Catatan */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <Package className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                                            Detail Peminjaman
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Jumlah
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={data.consumable_item_id ? getAvailableQuantity(data.consumable_item_id) : 1}
                                                    value={data.quantity}
                                                    onChange={(e) => {
                                                        const value = Math.max(1, Number(e.target.value) || 1);
                                                        const maxAvailable = data.consumable_item_id ? getAvailableQuantity(data.consumable_item_id) : 1;
                                                        const clampedValue = Math.min(value, maxAvailable);

                                                        setData('quantity', clampedValue);
                                                    }}
                                                    className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-center text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900 ${data.consumable_item_id && !validateQuantity(data.consumable_item_id, data.quantity)
                                                        ? 'border-red-500 ring-1 ring-red-500'
                                                        : ''
                                                        }`}
                                                    required
                                                />
                                                {data.consumable_item_id && (
                                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                        Tersedia: {getAvailableQuantity(data.consumable_item_id)}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.quantity && (
                                                <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">
                                                    {errors.quantity}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Catatan
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={data.notes}
                                                onChange={(e) =>
                                                    setData(
                                                        'notes',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Catatan tambahan (opsional)..."
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900"
                                            />
                                            {errors.notes && (
                                                <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">
                                                    {errors.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-10 flex items-center justify-end gap-3">
                                <Link
                                    href="/consumable-borrowings"
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
