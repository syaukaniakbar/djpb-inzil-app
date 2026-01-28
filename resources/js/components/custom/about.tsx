import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function About() {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative overflow-hidden bg-[#0b1c33] px-6 py-24 sm:py-32"
        >
            {/* Subtle Background Accent */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute right-0 top-0 h-64 w-64 bg-blue-900/20 blur-3xl" />
            </div>

            <div className="mx-auto max-w-5xl">
                {/* Badge */}
                <div className="mb-6 flex justify-start sm:justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-400">
                        <ShieldCheck size={14} />
                        Tata Kelola Aset Negara
                    </span>
                </div>

                {/* Heading */}
                <h1
                    id="hero-heading"
                    className="text-left text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-center sm:text-5xl lg:text-6xl"
                >
                    Sistem Manajemen
                    <span className="mt-2 block text-blue-400">
                        Peminjaman Aset Perbendaharaan
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-2xl text-left text-base leading-relaxed text-slate-200 sm:mx-auto sm:mt-8 sm:text-center sm:text-lg">
                    Mendukung pengelolaan aset DJPB yang tertib, transparan,
                    dan akuntabel melalui sistem digital terintegrasi
                    sesuai standar pengelolaan keuangan negara.
                </p>

                {/* CTA */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <button className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                        Ajukan Peminjaman
                        <ChevronRight size={18} />
                    </button>

                    <button className="cursor-pointer w-full rounded-md border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:text-white sm:w-auto">
                        Lihat Panduan Sistem
                    </button>
                </div>
            </div>
        </section>
    );
}
