import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, Car, ChevronLeft, MapPin, Send, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { VehicleBorrowingFormData } from '@/types/vehicle-borrowing';
import type { AvailableVehicle } from '@/types/vehicle';

export default function VehicleBorrowingCreate() {
    const { data, setData, post, processing, errors } = useForm<VehicleBorrowingFormData>({
        start_at: '',
        end_at: '',
        purpose: '',
        destination: '',
        vehicle_id: null,
    });

    const [availableVehicles, setAvailableVehicles] = useState<AvailableVehicle[]>([]);
    const [loadingVehicles, setLoadingVehicles] = useState(false);

    const datesReady = !!(data.start_at && data.end_at);

    useEffect(() => {
        if (!datesReady) {
            setAvailableVehicles([]);
            setData('vehicle_id', null);
            return;
        }

        setLoadingVehicles(true);

        const params = new URLSearchParams({
            start_at: data.start_at,
            end_at: data.end_at
        });

        fetch(`/api/vehicles/available-vehicles?${params}`)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setAvailableVehicles(result.vehicles);
                    if (data.vehicle_id && !result.vehicles.some((vehicle: AvailableVehicle) => vehicle.id === data.vehicle_id)) {
                        setData('vehicle_id', null);
                    }
                } else {
                    setAvailableVehicles([]);
                }
            })
            .catch(() => setAvailableVehicles([]))
            .finally(() => setLoadingVehicles(false));
    }, [data.start_at, data.end_at]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/vehicle-borrowings/store');
    };

    return (
        <AppLayout>
            <Head title="Peminjaman Kendaraan" />

            <div className="min-h-screen bg-[#f8fafc] px-3 py-6 md:px-6 md:py-12 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl">
                    <a href="/vehicle-borrowings" className="mb-6 inline-flex items-center p-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Kembali ke Daftar
                    </a>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 md:rounded-2xl dark:border-gray-800 dark:bg-gray-900">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Form Peminjaman Kendaraan</h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">Lengkapi detail di bawah untuk pengajuan unit kendaraan operasional.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 sm:p-8 md:p-10">
                            <div className="space-y-8 md:space-y-12">
                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-balance text-gray-800 dark:text-white">Periode Peminjaman</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tanggal & Waktu Mulai</label>
                                            <input type="datetime-local" value={data.start_at} onChange={(e) => setData('start_at', e.target.value)} className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900 ${errors.start_at ? 'border-red-500 ring-1 ring-red-500' : ''}`} required />
                                            {errors.start_at && <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">{errors.start_at}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tanggal & Waktu Selesai</label>
                                            <input type="datetime-local" value={data.end_at} onChange={(e) => setData('end_at', e.target.value)} className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900 ${errors.end_at ? 'border-red-500 ring-1 ring-red-500' : ''}`} required />
                                            {errors.end_at && <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">{errors.end_at}</p>}
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <Car className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Unit Kendaraan</h2>
                                    </div>

                                    {!datesReady && (
                                        <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                                            Isi tanggal peminjaman & pengembalian terlebih dahulu untuk memuat daftar kendaraan tersedia.
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pilih Unit Tersedia</label>
                                        <div className="relative">
                                            <select
                                                value={data.vehicle_id ?? ''}
                                                onChange={(e) => setData('vehicle_id', e.target.value ? Number(e.target.value) : null)}
                                                className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900 ${errors.vehicle_id ? 'border-red-500' : ''} disabled:cursor-not-allowed disabled:opacity-50`}
                                                required
                                                disabled={!datesReady || loadingVehicles}
                                            >
                                                <option value="">
                                                    {!datesReady
                                                        ? 'Isi tanggal dulu...'
                                                        : loadingVehicles
                                                            ? 'Memeriksa ketersediaan kendaraan...'
                                                            : availableVehicles.length === 0
                                                                ? 'Tidak ada kendaraan tersedia'
                                                                : 'Pilih Kendaraan...'}
                                                </option>
                                                {availableVehicles.map((v) => (
                                                    <option key={v.id} value={v.id}>{v.name} — {v.license_plate}</option>
                                                ))}
                                            </select>
                                            {loadingVehicles && (
                                                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                                                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                                </div>
                                            )}
                                        </div>
                                        {datesReady && !loadingVehicles && data.vehicle_id && (
                                            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">✓ Unit kendaraan tersedia untuk periode ini</p>
                                        )}
                                        {errors.vehicle_id && <p className="mt-1 text-xs font-medium text-red-500 dark:text-red-400">{errors.vehicle_id}</p>}
                                    </div>
                                </section>

                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3 dark:border-gray-800">
                                        <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Detail Perjalanan</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tujuan Peminjaman</label>
                                            <select value={data.purpose} onChange={(e) => setData('purpose', e.target.value)} className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900" required>
                                                <option value="">Pilih Kategori Tujuan</option>
                                                <option value="dalam_kota">Dalam Kota</option>
                                                <option value="luar_kota">Luar Kota</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Destinasi Spesifik</label>
                                            <input type="text" placeholder="Contoh: Kantor Pusat" value={data.destination} onChange={(e) => setData('destination', e.target.value)} className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-gray-900" required />
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 md:mt-14 md:flex-row md:items-center md:justify-end md:gap-4 dark:border-gray-800">
                                <a href="/vehicle-borrowings" className="order-2 flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 md:order-1">Batalkan Pengajuan</a>
                                <button type="submit" disabled={processing} className="order-1 flex h-12 items-center justify-center rounded-xl bg-blue-600 px-10 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] disabled:opacity-70 md:order-2 md:h-14">
                                    {processing ? (
                                        <span className="flex items-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center"><Send className="mr-2 h-4 w-4" />Ajukan Peminjaman</span>
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
