export default function Service() {
    return (
        <section
            className="flex min-h-screen items-center bg-white px-6 py-24"
            aria-labelledby="service-features-title"
        >
            <div className="mx-auto w-full max-w-6xl">
                {/* Header */}
                <header className="max-w-3xl text-left">
                    <h2
                        id="service-features-title"
                        className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl"
                    >
                        Solusi Terpadu untuk Aset dan Perbendaharaan
                    </h2>

                    <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
                        Memudahkan pengelolaan aset dan perbendaharaan secara
                        tertib, efisien, dan transparan melalui sistem yang
                        modern dan terintegrasi.
                    </p>
                </header>

                {/* Features */}
                <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Feature 1 */}
                    <article className="group rounded-2xl border border-gray-200 bg-gray-50 p-8 text-left shadow-sm transition-all hover:bg-white hover:shadow-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <h3 className="mb-3 text-xl font-semibold text-gray-900">
                            Manajemen Aset Otomatis
                        </h3>

                        <p className="text-sm leading-relaxed text-gray-600">
                            Mengelola data aset secara terstruktur dengan fitur
                            pelacakan, pendataan, dan pembaruan yang efisien.
                        </p>
                    </article>

                    {/* Feature 2 */}
                    <article className="group rounded-2xl border border-gray-200 bg-gray-50 p-8 text-left shadow-sm transition-all hover:bg-white hover:shadow-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 5v14m0-14c3 0 3-2 6-2s3 2 6 2 3-2 6-2v14"
                                />
                            </svg>
                        </div>

                        <h3 className="mb-3 text-xl font-semibold text-gray-900">
                            Pengelolaan Anggaran
                        </h3>

                        <p className="text-sm leading-relaxed text-gray-600">
                            Mengoptimalkan proses pencatatan dan pengawasan
                            anggaran dengan sistem yang mudah digunakan.
                        </p>
                    </article>

                    {/* Feature 3 */}
                    <article className="group rounded-2xl border border-gray-200 bg-gray-50 p-8 text-left shadow-sm transition-all hover:bg-white hover:shadow-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .587l3.668 7.568L24 9.748l-6 5.857L19.335 24 12 19.897 4.665 24 6 15.605 0 9.748l8.332-1.593z" />
                            </svg>
                        </div>

                        <h3 className="mb-3 text-xl font-semibold text-gray-900">
                            Laporan yang Transparan
                        </h3>

                        <p className="text-sm leading-relaxed text-gray-600">
                            Menyediakan laporan menyeluruh yang informatif,
                            akurat, dan mudah dipahami untuk pengambilan
                            keputusan.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
