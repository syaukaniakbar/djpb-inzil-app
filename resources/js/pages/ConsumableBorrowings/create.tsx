import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Calendar, Package, Send } from 'lucide-react';
import type { ConsumableBorrowingFormData, ConsumableBorrowingCreateProps } from '@/types/consumable-borrowing';
import type { AvailableConsumableItem } from '@/types/consumable-item';

export default function ConsumableBorrowingCreate({ consumableItems }: ConsumableBorrowingCreateProps) {
    const { data, setData, post, processing, errors } =
        useForm<ConsumableBorrowingFormData>({
            borrowed_at: '',
            consumable_item_id: null,
            quantity: 1,
            notes: '',
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

        post('/consumable-borrowings/store');
    };

    return (
        <AppLayout>
            <Head title="Peminjaman Persediaan" />

            <div className="min-h-screen bg-background px-3 py-6 md:px-6 md:py-12">
                <div className="mx-auto max-w-4xl">
                    {/* Back Button */}
                    <Link
                        href="/consumable-borrowings"
                        className="mb-6 inline-flex items-center p-1 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
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

                    <div className="overflow-hidden rounded-xl border bg-card shadow-xl md:rounded-2xl">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Form Peminjaman Persediaan
                            </h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Lengkapi detail di bawah untuk pengajuan peminjaman persediaan.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-8 md:p-10"
                        >
                            <div className="space-y-8 md:space-y-12">
                                {/* Section 1: Waktu & Barang */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-border pb-3">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-balance text-foreground">
                                            Informasi Peminjaman
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-foreground">
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
                                                className={`w-full rounded-xl border bg-muted/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-background focus:ring-4 focus:ring-blue-500/10 ${errors.borrowed_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.borrowed_at && (
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.borrowed_at}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-foreground">
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
                                                className={`w-full rounded-xl border bg-muted/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-background focus:ring-4 focus:ring-blue-500/10 ${errors.consumable_item_id ? 'border-red-500 ring-1 ring-red-500' : ''}`}
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
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.consumable_item_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Jumlah & Catatan */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-border pb-3">
                                        <Package className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-foreground">
                                            Detail Peminjaman
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-foreground">
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
                                                    className={`w-full rounded-xl border bg-muted/50 px-4 py-3.5 text-center text-sm transition-all focus:border-blue-500 focus:bg-background focus:ring-4 focus:ring-blue-500/10 ${data.consumable_item_id && !validateQuantity(data.consumable_item_id, data.quantity)
                                                        ? 'border-red-500 ring-1 ring-red-500'
                                                        : ''
                                                        }`}
                                                    required
                                                />
                                                {data.consumable_item_id && (
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        Tersedia: {getAvailableQuantity(data.consumable_item_id)}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.quantity && (
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.quantity}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-foreground">
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
                                                className="w-full rounded-xl border bg-muted/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-background focus:ring-4 focus:ring-blue-500/10"
                                            />
                                            {errors.notes && (
                                                <p className="mt-1 text-xs font-medium text-red-500">
                                                    {errors.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-10 flex items-center justify-end gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Send className="h-4 w-4" />
                                    {processing ? 'Mengirim...' : 'Ajukan Peminjaman'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
