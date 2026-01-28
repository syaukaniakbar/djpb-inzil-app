export default function Hero() {
    return (
        <section className="w-full overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 md:px-12 md:py-28">
                <div className="flex max-w-4xl flex-col items-start gap-6 text-left sm:gap-7 md:mx-auto md:items-center md:text-center">
                    {/* BADGE / EYEBROW */}
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 sm:text-sm">
                        Sistem Peminjaman Digital
                    </span>

                    {/* HEADING */}
                    <h1 className="font-montserrat text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                        Platform Terpadu untuk
                        <span className="block text-blue-700">
                            Peminjaman Aset yang Mudah
                        </span>
                    </h1>

                    {/* SUBTITLE */}
                    <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                        Kelola seluruh proses peminjaman dalam satu platform —
                        mulai dari pengecekan ketersediaan, pengajuan, hingga
                        pelacakan status secara real-time dan transparan.
                    </p>

                    {/* CTA BUTTONS */}
                    <div className="flex w-full flex-col gap-4 pt-6 sm:flex-row sm:justify-center">
                        <button className="cursor-pointer group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-800 hover:shadow-md active:scale-[0.97] sm:w-auto sm:text-base">
                            Mulai Peminjaman
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
