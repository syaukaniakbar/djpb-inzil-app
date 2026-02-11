import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, Car, ChevronLeft, MapPin, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Vehicle {
    id: number;
    name: string;
    license_plate: string;
}

interface VehicleBorrowingFormData {
    start_at: string;
    end_at: string;
    purpose: string;
    destination: string;
    vehicle_id: number | null;
}

interface Props {
    vehicles: Vehicle[];
}

export default function VehicleBorrowingCreate({ vehicles }: Props) {
    const { data, setData, post, processing, errors } =
        useForm<VehicleBorrowingFormData>({
            start_at: '',
            end_at: '',
            purpose: '',
            destination: '',
            vehicle_id: null,
        });

    const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>(vehicles);
    const [loadingVehicles, setLoadingVehicles] = useState(false);

    useEffect(() => {
        if (data.start_at && data.end_at) {
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

                        if (data.vehicle_id && !result.vehicles.some((vehicle: Vehicle) => vehicle.id === data.vehicle_id)) {
                            setData('vehicle_id', null);
                        }
                    } else {
                        console.error('API Error:', result.message);
                        setAvailableVehicles(vehicles);
                    }
                })
                .catch(error => {
                    console.error('Error fetching available vehicles:', error);
                    setAvailableVehicles(vehicles);
                })
                .finally(() => {
                    setLoadingVehicles(false);
                });
        } else {
            setAvailableVehicles(vehicles);
            setData('vehicle_id', null);
        }
    }, [data.start_at, data.end_at]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/vehicle-borrowings/store');
    };

    return (
        <AppLayout>
            <Head title="Peminjaman Kendaraan" />

            <div className="min-h-screen bg-[#f8fafc] px-3 py-6 md:px-6 md:py-12">
                <div className="mx-auto max-w-4xl">

                    <a
                        href="/vehicle-borrowings"
                        className="mb-6 inline-flex items-center p-1 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Kembali ke Daftar
                    </a>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-blue-900/5 md:rounded-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white md:px-10 md:py-12">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Form Peminjaman Kendaraan
                            </h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Lengkapi detail di bawah untuk pengajuan unit
                                kendaraan operasional.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-8 md:p-10"
                        >
                            <div className="space-y-8 md:space-y-12">
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
                                    </div>
                                </section>

                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3">
                                        <Car className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800">
                                            Unit Kendaraan
                                        </h2>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">
                                            Pilih Unit Tersedia
                                        </label>
                                        <select
                                            value={data.vehicle_id ?? ''}
                                            onChange={(e) =>
                                                setData(
                                                    'vehicle_id',
                                                    e.target.value
                                                        ? Number(e.target.value)
                                                        : null,
                                                )
                                            }
                                            className={`w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${errors.vehicle_id ? 'border-red-500' : ''}`}
                                            required
                                            disabled={loadingVehicles}
                                        >
                                            <option value="">
                                                {loadingVehicles ? 'Memuat kendaraan...' : 'Pilih Kendaraan...'}
                                            </option>
                                            {availableVehicles.map((v) => (
                                                <option
                                                    key={v.id}
                                                    value={v.id}
                                                >
                                                    {v.name} — {v.license_plate}
                                                </option>
                                            ))}
                                        </select>
                                        {loadingVehicles && (
                                            <p className="mt-1 text-xs font-medium text-blue-500">
                                                Memeriksa ketersediaan kendaraan...
                                            </p>
                                        )}
                                        {errors.vehicle_id && (
                                            <p className="mt-1 text-xs font-medium text-red-500">
                                                {errors.vehicle_id}
                                            </p>
                                        )}
                                    </div>
                                </section>

                                <section>
                                    <div className="mb-6 flex items-center border-b border-gray-100 pb-3">
                                        <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                                        <h2 className="text-lg font-bold text-gray-800">
                                            Detail Perjalanan
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Tujuan Peminjaman
                                            </label>
                                            <select
                                                value={data.purpose}
                                                onChange={(e) =>
                                                    setData(
                                                        'purpose',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                required
                                            >
                                                <option value="">
                                                    Pilih Kategori Tujuan
                                                </option>
                                                <option value="dalam_kota">
                                                    Dalam Kota
                                                </option>
                                                <option value="luar_kota">
                                                    Luar Kota
                                                </option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Destinasi Spesifik
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Kantor Pusat"
                                                value={data.destination}
                                                onChange={(e) =>
                                                    setData(
                                                        'destination',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                                required
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 md:mt-14 md:flex-row md:items-center md:justify-end md:gap-4">
                                <a
                                    href="/vehicle-borrowings"
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
