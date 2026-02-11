import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, Car, ChevronLeft, MapPin, Send } from 'lucide-react';

/* =======================
 * Interfaces (Tetap Sama)
 * ======================= */
interface Vehicle {
    id: number;
    name: string;
    license_plate: string;
}

interface User {
    id: number;
    name: string;
}

interface VehicleBorrowingFormData {
    start_at: string;
    end_at: string;
    purpose: string;
    destination: string;
    vehicle_id: number | null;
}

interface Props {
    borrowing: {
        id: number;
        start_at: string;
        end_at: string | null;
        returned_at: string | null;
        purpose: string;
        destination: string;
        status: string;
        admin_note: string | null;
        user: User;
        vehicle: Vehicle;
    };
    vehicles: Vehicle[];
}

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

export default function VehicleBorrowingEdit({ borrowing, vehicles }: Props) {
    const { data, setData, put, processing, errors } =
        useForm<VehicleBorrowingFormData>({
            start_at: formatDateTimeLocal(borrowing.start_at),
            end_at: formatDateTimeLocal(borrowing.end_at),
            purpose: borrowing.purpose || '',
            destination: borrowing.destination || '',
            vehicle_id: borrowing.vehicle.id,
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/vehicle-borrowings/${borrowing.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Peminjaman Kendaraan" />

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
                                Edit Form Peminjaman Kendaraan
                            </h1>
                            <p className="mt-2 text-sm text-blue-100 opacity-90 md:text-base">
                                Silakan edit form berikut untuk memperbarui peminjaman kendaraan.
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
                                        >
                                            <option value="">
                                                Pilih Kendaraan...
                                            </option>
                                            {vehicles.map((v) => (
                                                <option key={v.id} value={v.id}>
                                                    {v.name} — {v.license_plate}
                                                </option>
                                            ))}
                                        </select>
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
                                                    📍 Dalam Kota
                                                </option>
                                                <option value="luar_kota">
                                                    🛣️ Luar Kota
                                                </option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">
                                                Destinasi Spesifik
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Kantor Cabang Bandung"
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
