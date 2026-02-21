import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, ClipboardList, Send, Search, X, Loader2 } from 'lucide-react';
import { AvailableInventory, BorrowingItem, BorrowingFormData } from '@/types/borrowing';
import { useState, useEffect, useCallback, useRef } from 'react';

interface BorrowingDetail {
    id: number;
    notes: string | null;
    inventory_id: number;
    inventory: { id: number; name: string; serial_number: string } | null;
}

interface User {
    id: number;
    name: string;
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
        borrowing_details: BorrowingDetail[] | null;
    };
}

const formatDateTimeLocal = (dt: string | null): string => {
    if (!dt) return '';
    const d = new Date(dt);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function BorrowingEdit({ borrowing }: Props) {
    const { data, setData, put, processing, errors } = useForm<BorrowingFormData>({
        start_at: formatDateTimeLocal(borrowing.start_at),
        end_at: formatDateTimeLocal(borrowing.end_at ?? null),
        notes: borrowing.notes || '',
        items: borrowing.borrowing_details?.map((d) => ({
            inventory_id: d.inventory_id,
            notes: d.notes || '',
        })) || [{ inventory_id: null, notes: '' }],
    });

    // ── Live-search state ────────────────────────────────────────────────────
    const itemCount = data.items.length;
    const [inventories, setInventories] = useState<AvailableInventory[]>([]);
    const [searchQuery, setSearchQuery] = useState<string[]>(Array(itemCount).fill(''));
    const [loading, setLoading] = useState<boolean[]>(Array(itemCount).fill(false));
    const abortRefs = useRef<(AbortController | null)[]>(Array(itemCount).fill(null));

    const datesReady = !!data.start_at && !!data.end_at;

    const fetchInventories = useCallback(
        async (index: number, search: string) => {
            if (!data.start_at || !data.end_at) return;

            abortRefs.current[index]?.abort();
            const controller = new AbortController();
            abortRefs.current[index] = controller;

            setLoading((prev) => { const n = [...prev]; n[index] = true; return n; });

            try {
                const params = new URLSearchParams({
                    start_at: data.start_at,
                    end_at: data.end_at,
                    exclude_borrowing: String(borrowing.id),
                    ...(search ? { search } : {}),
                });
                const res = await fetch(`/api/inventories/available-inventories?${params}`, {
                    signal: controller.signal,
                });
                const json = await res.json();
                if (json.success) setInventories(json.inventories as AvailableInventory[]);
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== 'AbortError') console.error(err);
            } finally {
                setLoading((prev) => { const n = [...prev]; n[index] = false; return n; });
            }
        },
        [data.start_at, data.end_at, borrowing.id],
    );

    // Fetch when dates change
    useEffect(() => {
        if (!datesReady) return;
        searchQuery.forEach((q, i) => fetchInventories(i, q));
    }, [datesReady, data.start_at, data.end_at]);

    // ── Item helpers ─────────────────────────────────────────────────────────
    const addItem = () => {
        setData('items', [...data.items, { inventory_id: null, notes: '' }]);
        setSearchQuery((p) => [...p, '']);
        setLoading((p) => [...p, false]);
        abortRefs.current.push(null);
    };

    const removeItem = (index: number) => {
        if (data.items.length <= 1) return;
        setData('items', data.items.filter((_, i) => i !== index));
        setSearchQuery((p) => p.filter((_, i) => i !== index));
        setLoading((p) => p.filter((_, i) => i !== index));
        abortRefs.current = abortRefs.current.filter((_, i) => i !== index);
    };

    const updateItem = <K extends keyof BorrowingItem>(index: number, field: K, value: BorrowingItem[K]) => {
        const items = [...data.items];
        items[index] = { ...items[index], [field]: value };
        setData('items', items);
    };

    const handleSearch = (index: number, value: string) => {
        setSearchQuery((p) => { const n = [...p]; n[index] = value; return n; });
        fetchInventories(index, value);
    };

    const selectedIds = data.items.map((i) => i.inventory_id).filter(Boolean) as number[];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filledItems = data.items.filter((i) => i.inventory_id !== null);
        if (filledItems.length === 0) {
            alert('Harap pilih minimal satu barang.');
            return;
        }
        put(`/borrowings/${borrowing.id}`);
    };

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <AppLayout>
            <Head title="Edit Peminjaman Barang" />

            <div className="min-h-screen bg-[#f8fafc] px-3 py-6 md:px-6 md:py-12 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">
                    <a
                        href="/borrowings"
                        className="mb-6 inline-flex items-center p-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar
                    </a>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 md:rounded-2xl dark:border-gray-800 dark:bg-gray-900">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Edit Form Peminjaman Barang</h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Silakan edit form berikut untuk memperbarui peminjaman barang.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-10">
                            <div className="space-y-8 md:space-y-12">

                                {/* Section 1: Periode */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Periode Peminjaman</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tanggal &amp; Waktu Mulai</label>
                                            <input
                                                type="datetime-local"
                                                value={data.start_at}
                                                onChange={(e) => setData('start_at', e.target.value)}
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${errors.start_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                                required
                                            />
                                            {errors.start_at && <p className="mt-1 text-xs font-medium text-red-500">{errors.start_at}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tanggal &amp; Waktu Selesai</label>
                                            <input
                                                type="datetime-local"
                                                value={data.end_at}
                                                onChange={(e) => setData('end_at', e.target.value)}
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${errors.end_at ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                            />
                                            {errors.end_at && <p className="mt-1 text-xs font-medium text-red-500">{errors.end_at}</p>}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tujuan / Catatan Umum</label>
                                            <textarea
                                                rows={2}
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                placeholder="Contoh: Untuk keperluan dokumentasi event gathering..."
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Section 2: Barang */}
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <ClipboardList className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Barang yang Dipinjam</h2>
                                    </div>

                                    {!datesReady && (
                                        <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                                            Isi tanggal peminjaman &amp; pengembalian terlebih dahulu untuk memuat daftar barang tersedia.
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {data.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="group relative grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50/30 p-5 transition-all hover:border-blue-200 hover:bg-white md:grid-cols-2 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-blue-700 dark:hover:bg-gray-800"
                                            >
                                                {/* Inventory live-search */}
                                                <div>
                                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                                        Pilih Barang
                                                    </label>
                                                    <div className="relative">
                                                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            disabled={!datesReady}
                                                            value={searchQuery[index] ?? ''}
                                                            onChange={(e) => handleSearch(index, e.target.value)}
                                                            placeholder={datesReady ? 'Cari nama / nomor seri...' : 'Isi tanggal dulu'}
                                                            className="w-full rounded-xl border-gray-200 bg-gray-50/50 py-3 pr-4 pl-9 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                        />
                                                        {loading[index] && (
                                                            <Loader2 className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin text-blue-500" />
                                                        )}
                                                    </div>
                                                    <select
                                                        value={item.inventory_id?.toString() ?? ''}
                                                        onChange={(e) => updateItem(index, 'inventory_id', e.target.value ? Number(e.target.value) : null)}
                                                        disabled={!datesReady}
                                                        className="mt-2 w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                        required
                                                    >
                                                        <option value="">— Pilih Barang —</option>
                                                        {/* Always show the currently selected item even if not in search results */}
                                                        {item.inventory_id &&
                                                            !inventories.find((inv) => inv.id === item.inventory_id) && (
                                                                <option value={item.inventory_id}>
                                                                    {borrowing.borrowing_details?.find((d) => d.inventory_id === item.inventory_id)?.inventory?.name ?? `Barang #${item.inventory_id}`}
                                                                </option>
                                                            )}
                                                        {inventories
                                                            .filter((inv) => !selectedIds.includes(inv.id) || inv.id === item.inventory_id)
                                                            .map((inv) => (
                                                                <option key={inv.id} value={inv.id}>
                                                                    {inv.label}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {item.inventory_id && (
                                                        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                                            ✓ Tersedia untuk periode ini
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Notes */}
                                                <div>
                                                    <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                                        Keterangan Barang
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.notes ?? ''}
                                                        onChange={(e) => updateItem(index, 'notes', e.target.value)}
                                                        placeholder="Kondisi, spesifikasi, dll"
                                                        className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                    />
                                                </div>

                                                {/* Delete button */}
                                                {data.items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(index)}
                                                        className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-red-100 bg-white text-red-500 shadow-sm transition-all hover:bg-red-500 hover:text-white md:opacity-0 md:group-hover:opacity-100 dark:border-red-900 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-red-600"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addItem}
                                            disabled={!datesReady}
                                            className="mt-4 inline-flex items-center rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Tambah Barang
                                        </button>

                                        {errors.items && (
                                            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                <span>Pastikan semua barang telah dipilih dengan benar.</span>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            {/* Actions */}
                            <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 md:mt-14 md:flex-row md:items-center md:justify-end md:gap-4 dark:border-gray-800">
                                <a href="/borrowings" className="order-2 flex h-12 items-center justify-center px-6 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 md:order-1">
                                    Batalkan Pengajuan
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="order-1 flex h-12 items-center justify-center rounded-xl bg-blue-600 px-10 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] disabled:opacity-70 md:order-2 md:h-14"
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Send className="mr-2 h-4 w-4" />
                                            Perbarui Peminjaman
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
