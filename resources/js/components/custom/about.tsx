import { ChevronRight, Globe, Layers, ShieldCheck } from 'lucide-react';

export default function About() {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative overflow-hidden bg-[#0a192f] px-6 py-28 sm:py-32"
        >
            {/* Background Decorative - Efek Cahaya Halus agar tidak flat */}
            <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 rounded-full bg-blue-900/20 blur-[120px]" />

            <div className="mx-auto max-w-5xl text-center">
                {/* Badge Atas */}
                <div className="mb-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-300">
                        <ShieldCheck size={14} />
                        Standar Akuntabilitas Keuangan Negara
                    </span>
                </div>

                {/* Heading - Menggunakan Kerning yang lebih rapat untuk kesan premium */}
                <h1
                    id="hero-heading"
                    className="text-4xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                    Manajemen <span className="text-blue-400">Peminjaman</span>{' '}
                    &{' '}
                    <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Aset Perbendaharaan
                    </span>{' '}
                    yang Lebih Tertib dan Terkendali
                </h1>

                {/* Subtext - Menjelaskan Nilai UX */}
                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
                    Transformasi tata kelola inventaris DJPB melalui sistem
                    monitoring real-time, mengedepankan transparansi untuk
                    efisiensi birokrasi yang lebih baik.
                </p>

                {/* CTA Buttons - Menambah interaksi UX */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <button className="flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        Mulai Peminjaman <ChevronRight size={18} />
                    </button>
                    <button className="rounded-full border border-slate-700 bg-slate-800/50 px-7 py-3 text-sm font-bold text-slate-200 transition-all hover:border-slate-500 hover:bg-slate-800">
                        Pelajari Alur Aset
                    </button>
                </div>

                {/* Integration Info (Menggantikan Logo Brand Luar) */}
                <div className="mt-20">
                    <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                        Terintegrasi Dengan Ekosistem Digital
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
                        <div className="flex items-center gap-2 text-slate-300 transition-opacity hover:opacity-100">
                            <Layers size={20} className="text-blue-400" />
                            <span className="text-sm font-bold tracking-wider">
                                SIMAK-BMN
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 transition-opacity hover:opacity-100">
                            <Globe size={20} className="text-emerald-400" />
                            <span className="text-sm font-bold tracking-wider">
                                SATU DATA
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 transition-opacity hover:opacity-100">
                            <ShieldCheck size={20} className="text-amber-400" />
                            <span className="text-sm font-bold tracking-wider">
                                ISO 27001
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
