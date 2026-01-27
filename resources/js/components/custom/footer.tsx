import {
    ExternalLink,
    Facebook,
    Mail,
    MapPin,
    Phone,
    Youtube,
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-800 bg-[#070f1d] px-6 py-16 text-slate-300">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    {/* BRANDING SECTION - 5/12 Column for prominence */}
                    <div className="space-y-6 md:col-span-5">
                        <div className="flex items-start space-x-4">
                            <img
                                src="/images/kemenkeu-logo.png"
                                alt="Logo Kemenkeu RI"
                                className="h-16 w-16 object-contain brightness-110"
                            />
                            <div>
                                <h2 className="text-base font-bold tracking-wider text-white uppercase">
                                    Kementerian Keuangan RI
                                </h2>
                                <p className="mt-1 text-sm font-medium text-blue-400">
                                    Direktorat Jenderal Perbendaharaan
                                </p>
                                <p className="text-xs text-slate-400">
                                    Kanwil Provinsi Kalimantan Timur
                                </p>
                            </div>
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                            Mewujudkan pengelolaan perbendaharaan negara yang
                            unggul di tingkat regional demi mendukung ekonomi
                            Kalimantan Timur yang inklusif dan berkelanjutan.
                        </p>
                    </div>

                    {/* QUICK LINKS - 2/12 Column */}
                    <div className="md:col-span-2">
                        <h3 className="mb-6 text-sm font-bold tracking-[0.1em] text-white uppercase">
                            Navigasi
                        </h3>
                        <ul className="space-y-4 text-sm">
                            {[
                                'Beranda',
                                'Layanan',
                                'Tentang Inzil',
                                'Panduan',
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="group flex items-center transition-colors hover:text-blue-400"
                                    >
                                        <span className="h-px w-0 bg-blue-400 transition-all group-hover:mr-2 group-hover:w-3"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT & SOCIAL - 2/12 Column */}
                    <div className="md:col-span-2">
                        <h3 className="mb-6 text-sm font-bold tracking-[0.1em] text-white uppercase">
                            Media Sosial
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 transition-colors hover:text-blue-400"
                                >
                                    <Facebook
                                        size={18}
                                        className="text-blue-500"
                                    />
                                    <span>Facebook</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 transition-colors hover:text-blue-400"
                                >
                                    <Youtube
                                        size={18}
                                        className="text-red-500"
                                    />
                                    <span>YouTube</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-3 transition-colors hover:text-blue-400"
                                >
                                    <Mail
                                        size={18}
                                        className="text-emerald-500"
                                    />
                                    <span>Email Resmi</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* ADDRESS - 3/12 Column */}
                    <div className="md:col-span-3">
                        <h3 className="mb-6 text-sm font-bold tracking-[0.1em] text-white uppercase">
                            Lokasi Strategis
                        </h3>
                        <div className="flex items-start gap-3 text-sm leading-relaxed">
                            <MapPin
                                size={20}
                                className="mt-1 flex-shrink-0 text-blue-400"
                            />
                            <p>
                                Jl. Ir. H. Juanda No. 4, <br />
                                Air Hitam, Kec. Samarinda Ulu, <br />
                                Kota Samarinda, Kalimantan Timur 75124
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-3 text-sm">
                            <Phone size={18} className="text-blue-400" />
                            <span>(0541) 741123</span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-16 flex flex-col items-center justify-between border-t border-slate-800 pt-8 md:flex-row">
                    <p className="text-center text-xs tracking-wide text-slate-500 md:text-left">
                        © {currentYear}{' '}
                        <span className="font-medium text-slate-400">
                            DJPB Kalimantan Timur
                        </span>
                        . Bagian dari ekosistem digital Kementerian Keuangan RI.
                    </p>
                    <div className="mt-4 flex items-center gap-6 text-xs font-medium text-slate-500 md:mt-0">
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Kebijakan Privasi
                        </a>
                        <a
                            href="#"
                            className="transition-colors hover:text-white"
                        >
                            Syarat & Ketentuan
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-1 transition-colors hover:text-white"
                        >
                            Kemenkeu.go.id <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
