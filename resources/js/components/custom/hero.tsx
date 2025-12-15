export default function Hero() {
    return (
        <section className="w-full overflow-hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-6 md:px-12">
                <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 text-left md:items-center md:gap-8 md:pt-20 md:text-center">
                    {/* BADGE / EYEBROW */}
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
                        Sistem Peminjaman Digital
                    </span>

                    {/* HEADING */}
                    <h1 className="max-w-4xl font-montserrat text-4xl leading-tight font-bold tracking-tight text-gray-900 md:text-6xl lg:text-5xl">
                        Platform Terpadu untuk Peminjaman Mudah
                    </h1>

                    {/* SUBTITLE */}
                    <p className="max-w-2xl font-montserrat leading-relaxed text-gray-600 lg:text-xl">
                        Kelola seluruh proses peminjaman dalam satu
                        platform—mulai dari cek ketersediaan, pengajuan, hingga
                        pelacakan status secara real-time.
                    </p>

                    {/* CTA BUTTONS */}
                    <div className="flex w-full flex-col items-start gap-4 pt-4 sm:flex-row sm:justify-center md:items-center">
                        {/* PRIMARY CTA */}
                        <button className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-800 hover:shadow-lg active:scale-[0.97] sm:w-auto md:text-lg">
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
