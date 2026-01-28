import {
    ExternalLink,
    Facebook,
    MapPin,
    Phone,
    Youtube,
    Instagram,
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const linkHover =
        'transition-colors hover:text-blue-600';

    return (
        <footer className="border-t border-slate-200 bg-white px-6 py-16 text-slate-600">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    {/* BRANDING */}
                    <div className="space-y-6 md:col-span-5">
                        <div className="flex items-start gap-4">
                            <img
                                src="/images/kemenkeu-logo.png"
                                alt="Logo Kemenkeu RI"
                                className="h-16 w-16 object-contain"
                            />
                            <div>
                                <h2 className="text-sm font-bold tracking-wider text-slate-900 uppercase">
                                    Kementerian Keuangan RI
                                </h2>
                                <p className="mt-1 text-sm font-semibold text-blue-600">
                                    Direktorat Jenderal Perbendaharaan
                                </p>
                                <p className="text-xs text-slate-500">
                                    Kanwil Provinsi Kalimantan Timur
                                </p>
                            </div>
                        </div>

                        <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                            Mewujudkan pengelolaan perbendaharaan negara yang
                            unggul di tingkat regional demi mendukung ekonomi
                            Kalimantan Timur yang inklusif dan berkelanjutan.
                        </p>
                    </div>

                    {/* NAVIGATION */}
                    <div className="md:col-span-2">
                        <h3 className="mb-6 text-xs font-bold tracking-widest text-slate-900 uppercase">
                            Navigasi
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {['Beranda', 'Layanan', 'Tentang Inzil', 'Contact Us'].map(
                                (item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className={linkHover}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* SOCIAL */}
                    <div className="md:col-span-2">
                        <h3 className="mb-6 text-xs font-bold tracking-widest text-slate-900 uppercase">
                            Media Sosial
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.facebook.com/DJPb.KemenkeuRI/"
                                    className={`flex items-center gap-3 ${linkHover}`}
                                >
                                    <Facebook size={16} />
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.youtube.com/channel/UCFzlOuEE-Fcqy7C3vbTreTw"
                                    className={`flex items-center gap-3 ${linkHover}`}
                                >
                                    <Youtube size={16} />
                                    YouTube
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com/ditjenperbendaharaan/"
                                    className={`flex items-center gap-3 ${linkHover}`}
                                >
                                    <Instagram size={16} />
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* ADDRESS */}
                    <div className="md:col-span-3">
                        <h3 className="mb-6 text-xs font-bold tracking-widest text-slate-900 uppercase">
                            Lokasi
                        </h3>

                        <div className="flex items-start gap-3 text-sm leading-relaxed">
                            <MapPin size={18} className="mt-1 text-blue-600" />
                            <p>
                                Jl. Ir. H. Juanda No. 4, Air Hitam <br />
                                Samarinda Ulu, Kalimantan Timur 75124
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3 text-sm">
                            <Phone size={16} className="text-blue-600" />
                            <span>(0541) 741123</span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-16 flex flex-col items-center justify-between border-t border-slate-200 pt-6 md:flex-row">
                    <p className="text-xs text-slate-500">
                        © {currentYear}{' '}
                        <span className="font-medium text-slate-700">
                            DJPB Kalimantan Timur
                        </span>
                        . Kementerian Keuangan RI.
                    </p>
                </div>
            </div>
        </footer>
    );
}
