import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface Inventory {
    id: number;
    name: string;
    category: string;
    created_at?: string;
    updated_at?: string;
}

interface Props {
    inventories: Inventory[];
}

export default function Index({ inventories }: Props) {
    return (
        <AppLayout>
            <Head title="Peminjaman Kendaraan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-semibold">
                                Peminjaman Kendaraan
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-4 py-2 text-left">
                                                ID
                                            </th>
                                            <th className="border px-4 py-2 text-left">
                                                Name
                                            </th>
                                            <th className="border px-4 py-2 text-left">
                                                Category
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventories.length > 0 ? (
                                            inventories.map((inventory) => (
                                                <tr key={inventory.id}>
                                                    <td className="border px-4 py-2">
                                                        {inventory.id}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {inventory.name}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {inventory.category}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="border px-4 py-2 text-center text-gray-500"
                                                >
                                                    No inventory data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
