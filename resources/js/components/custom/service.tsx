import { ArrowRight, FileText, PieChart, ShieldCheck } from 'lucide-react';

export default function Service() {
    return (
        <section
            className="relative overflow-hidden bg-slate-50 px-6 py-24 md:py-32"
            aria-labelledby="service-features-title"
        >
            {/* Dekorasi Background Halus */}
            <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-full -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="mx-auto w-full max-w-6xl">
                {/* Header Section */}
                <header className="mb-20 max-w-3xl text-left">
                    <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-700 uppercase">
                        Layanan Digital DJPB
                    </span>
                    <h2
                        id="service-features-title"
                        className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 md:text-5xl"
                    >
                        Solusi Terpadu untuk{' '}
                        <span className="text-blue-600">
                            Aset & Perbendaharaan
                        </span>
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-600">
                        Transformasi digital untuk pengelolaan keuangan negara
                        yang lebih tertib, efisien, dan transparan melalui
                        ekosistem yang modern dan terintegrasi.
                    </p>
                </header>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Feature 1 - Aset */}
                    <article className="group relative flex flex-col justify-between rounded-2xl border border-t-4 border-slate-200 border-t-emerald-500 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/50">
                        <div>
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                                <ShieldCheck size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-slate-900">
                                Manajemen Aset Otomatis
                            </h3>
                            <p className="text-[15px] leading-relaxed text-slate-500">
                                Optimalisasi siklus hidup aset negara mulai dari
                                perencanaan, penatausahaan, hingga penghapusan
                                secara real-time.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center text-sm font-semibold text-emerald-600 opacity-0 transition-all group-hover:opacity-100">
                            Selengkapnya{' '}
                            <ArrowRight size={16} className="ml-2" />
                        </div>
                    </article>

                    {/* Feature 2 - Anggaran */}
                    <article className="group relative flex flex-col justify-between rounded-2xl border border-t-4 border-slate-200 border-t-blue-600 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/50">
                        <div>
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                <PieChart size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-slate-900">
                                Pengelolaan Anggaran
                            </h3>
                            <p className="text-[15px] leading-relaxed text-slate-500">
                                Monitoring penyerapan anggaran yang presisi
                                untuk memastikan efektivitas belanja pemerintah
                                di setiap lini.
                            </p>
                        </div>
                        <div className="mt-8 flex items-center text-sm font-semibold text-blue-600 opacity-0 transition-all group-hover:opacity-100">
                            Selengkapnya{' '}
                            <ArrowRight size={16} className="ml-2" />
                        </div>
                    </article>

                    {/* Feature 3 - Laporan */}
                    <article className="group relative flex flex-col justify-between rounded-2xl border border-t-4 border-slate-200 border-t-amber-500 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/50">
                        <div>
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                                <FileText size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-slate-900">
                                Laporan Transparan
                            </h3>
                            <p className="text-[15px] leading-relaxed text-slate-500">
                                Penyajian data keuangan yang akuntabel dan mudah
                                diakses untuk pengambilan kebijakan yang
                                berbasis data (data-driven).
                            </p>
                        </div>
                        <div className="mt-8 flex items-center text-sm font-semibold text-amber-600 opacity-0 transition-all group-hover:opacity-100">
                            Selengkapnya{' '}
                            <ArrowRight size={16} className="ml-2" />
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
