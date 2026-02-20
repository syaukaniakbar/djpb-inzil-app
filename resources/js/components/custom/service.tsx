import {
    Building2,
    Car,
    Package
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { JSX } from 'react';

export default function Service(): JSX.Element {
    return (
        <div className="w-full bg-slate-50">
            <motion.section
                id="service"
                className="relative overflow-hidden bg-slate-50 px-6 py-24 md:py-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeIn" }}
            >
                {/* Soft gradient accent */}
                <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-blue-50 to-transparent" />

                <div className="mx-auto max-w-6xl">
                    <header className="mb-16 max-w-3xl">
                        <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-700 uppercase">
                            Layanan Digital DJPB
                        </span>

                        <h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                            Inovasi GenZ pada{" "}
                            <span className="text-blue-700">
                                Sistem Informasi dan Layanan
                            </span>
                        </h2>

                        <p className="text-lg leading-relaxed text-slate-600">
                            Ekosistem digital terintegrasi untuk mendukung
                            pengelolaan aset dan layanan perbendaharaan yang
                            efisien, tertib, dan transparan.
                        </p>
                    </header>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Card 1 */}
                        <article className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <Building2 size={26} />
                            </div>

                            <h3 className="mb-3 text-xl font-semibold text-slate-900">
                                Peminjaman Ruangan
                            </h3>

                            <p className="text-sm leading-relaxed text-slate-600">
                                Pengelolaan penggunaan ruangan secara digital
                                melalui proses pengajuan, persetujuan, dan
                                monitoring yang terstruktur.
                            </p>
                        </article>

                        {/* Card 2 */}
                        <article className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <Car size={26} />
                            </div>

                            <h3 className="mb-3 text-xl font-semibold text-slate-900">
                                Peminjaman Kendaraan
                            </h3>

                            <p className="text-sm leading-relaxed text-slate-600">
                                Sistem peminjaman kendaraan dinas yang
                                terintegrasi, memudahkan pengajuan hingga
                                pengelolaan jadwal penggunaan.
                            </p>
                        </article>

                        {/* Card 3 */}
                        <article className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                <Package size={26} />
                            </div>

                            <h3 className="mb-3 text-xl font-semibold text-slate-900">
                                Peminjaman Aset
                            </h3>

                            <p className="text-sm leading-relaxed text-slate-600">
                                Digitalisasi peminjaman aset untuk memastikan
                                pencatatan, persetujuan, dan pemantauan aset
                                yang lebih akurat.
                            </p>
                        </article>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
