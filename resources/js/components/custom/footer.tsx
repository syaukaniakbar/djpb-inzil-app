export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black px-6 py-14">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
                {/* BRANDING */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/images/kemenkeu-logo.png"
                            alt="Logo Kemenkeu RI"
                            className="h-14 w-14 object-contain"
                        />
                        <div>
                            <p className="text-sm leading-tight font-semibold text-white">
                                KEMENTERIAN KEUANGAN RI
                            </p>
                            <p className="text-xs leading-tight text-neutral-300">
                                Direktorat Jenderal Perbendaharaan <br />
                                Kanwil Provinsi Kalimantan Timur
                            </p>
                        </div>
                    </div>

                    <p className="max-w-xs text-sm leading-relaxed text-neutral-300">
                        Sistem aplikasi perbendaharaan terpadu untuk mendukung
                        tata kelola sarana, prasarana, dan layanan internal
                        secara lebih efektif, akuntabel, dan transparan.
                    </p>
                </div>

                {/* NAVIGATION */}
                <div>
                    <h3 className="mb-4 text-base font-semibold tracking-wide text-white">
                        Halaman
                    </h3>

                    <ul className="space-y-3 text-sm text-neutral-300">
                        {[
                            'Beranda',
                            'Layanan',
                            'Tentang Inzil',
                            'Contact Us',
                        ].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="mb-4 text-base font-semibold tracking-wide text-white">
                        Kontak & Media
                    </h3>

                    <ul className="space-y-4 text-sm text-neutral-300">
                        <li className="flex items-center space-x-3">
                            <svg
                                className="h-5 w-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12A10 10 0 1 0 2 12a10 10 0 0 0 20 0zM11 11h2v6h-2v-6zm1-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                            </svg>
                            <span>Email Resmi</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg
                                className="h-5 w-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.3h-1.1c-1 0-1.4.6-1.4 1.3V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12z" />
                            </svg>
                            <span>Facebook Resmi</span>
                        </li>

                        <li className="flex items-center space-x-3">
                            <svg
                                className="h-5 w-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 15l5.2-3L10 9v6z" />
                            </svg>
                            <span>YouTube Channel</span>
                        </li>
                    </ul>
                </div>

                {/* ADDRESS */}
                <div>
                    <h3 className="mb-4 text-base font-semibold tracking-wide text-white">
                        Alamat Kantor
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-300">
                        Jl. Ir. H. Juanda No. 4
                        <br />
                        Samarinda, Kalimantan Timur
                        <br />
                        Kode Pos 75124
                    </p>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="mt-12 border-t border-white/10 pt-6 text-center">
                <p className="text-xs text-neutral-400">
                    © 2025 Kementerian Keuangan RI — Direktorat Jenderal
                    Perbendaharaan. Seluruh Hak Cipta Dilindungi.
                </p>
            </div>
        </footer>
    );
}
