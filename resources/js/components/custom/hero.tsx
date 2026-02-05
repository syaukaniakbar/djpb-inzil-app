import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export default function Hero() {
    return (
        <section id="hero" className="w-full overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 md:px-12 md:py-14">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: false,
                        amount: 0.35,
                    }}
                    className="flex max-w-4xl flex-col items-start gap-6 text-left sm:gap-7 md:mx-auto md:items-center md:text-center"
                >
                    {/* BADGE */}
                    <motion.span
                        variants={itemVariants}
                        className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 sm:text-sm"
                    >
                        Sistem Peminjaman Digital
                    </motion.span>

                    {/* HEADING */}
                    <motion.h1
                        variants={itemVariants}
                        className="font-montserrat text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        Platform Terpadu untuk
                        <span className="block text-blue-700">
                            Peminjaman Aset yang Mudah
                        </span>
                    </motion.h1>

                    {/* SUBTITLE */}
                    <motion.p
                        variants={itemVariants}
                        className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl"
                    >
                        Kelola seluruh proses peminjaman dalam satu platform —
                        mulai dari pengecekan ketersediaan, pengajuan, hingga
                        pelacakan status secara real-time dan transparan.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        variants={itemVariants}
                        className="flex w-full flex-col gap-4 pt-6 sm:flex-row sm:justify-center"
                    >
                        <motion.a
                            href="/login"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="group flex w-full items-center justify-center gap-2 rounded bg-blue-700 px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-800 hover:shadow-md sm:w-auto sm:text-base"
                        >
                            Mulai Peminjaman
                            <span className="transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
