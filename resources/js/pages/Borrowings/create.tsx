import AppLayout from '@/layouts/app-layout';
import { Form, Head } from '@inertiajs/react';

export default function BorrowingCreate() {
    return (
        <AppLayout>
            <Head title="Peminjaman Barang" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="max-w-xl rounded-xl border bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-lg font-semibold">
                        Tambah Peminjaman
                    </h1>

                    <Form action="/users" method="post">
                        <input type="text" name="name" />
                        <input type="email" name="email" />
                        <button type="submit">Create User</button>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
