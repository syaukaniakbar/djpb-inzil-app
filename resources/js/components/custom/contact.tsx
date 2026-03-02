'use client';

import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
    const { props } = usePage();
    const adminPhone = props.adminPhone as string | null;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Format phone number for WhatsApp (remove leading 0, add 62)
    const formatWhatsAppNumber = (phone: string) => {
        // Remove any non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        // If starts with 0, replace with 62
        if (cleaned.startsWith('0')) {
            return '62' + cleaned.substring(1);
        }
        // If starts with 62, keep as is
        if (cleaned.startsWith('62')) {
            return cleaned;
        }
        // Otherwise assume it's already in international format
        return cleaned;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) {
            alert('Mohon isi nama dan pesan Anda');
            return;
        }

        if (!adminPhone) {
            alert('Nomor WhatsApp admin belum tersedia');
            return;
        }

        // Format message for WhatsApp
        const whatsappMessage = `Halo Admin DJPb Kaltim,

Saya ${name}${email ? ` (${email})` : ''} ingin menyampaikan pesan:

${message}

Terima kasih.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Format the phone number and open WhatsApp
        const whatsappNumber = formatWhatsAppNumber(adminPhone);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="flex min-h-screen flex-col overflow-hidden bg-white text-black">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="w-full border-b border-black/10 bg-white"
            >
                <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28">
                    <h1 className="text-4xl leading-tight font-semibold tracking-tight md:text-5xl lg:text-6xl">
                        Informasi Kontak Resmi
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
                        Hubungi kami untuk bantuan layanan peminjaman
                        perbendaharaan di lingkungan DJPb Kalimantan Timur.
                    </p>
                </div>
            </motion.div>

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-20 md:flex-row md:py-28">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                    className="flex-1 space-y-12"
                >
                    {/* Email */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        }}
                        className="space-y-2"
                    >
                        <h3 className="text-xs font-semibold tracking-widest text-neutral-500">
                            EMAIL RESMI
                        </h3>
                        <p className="text-xl font-medium">
                            djpb.kaltim@kemenkeu.go.id
                        </p>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        }}
                        className="space-y-2"
                    >
                        <h3 className="text-xs font-semibold tracking-widest text-neutral-500">
                            ALAMAT KANTOR
                        </h3>
                        <p className="text-lg leading-relaxed text-neutral-800">
                            Kanwil DJPb Provinsi Kalimantan Timur <br />
                            Jl. Ir. H. Juanda No. 19, Samarinda <br />
                            75124
                        </p>
                    </motion.div>
                </motion.div>
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex-1 space-y-8 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-800">
                            Nama Anda
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan nama lengkap Anda"
                            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 mt-2 text-black placeholder-neutral-400 focus:border-black focus:ring-2 focus:ring-black/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-800">
                            Email Anda
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@domain.com"
                            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 mt-2 text-black placeholder-neutral-400 focus:border-black focus:ring-2 focus:ring-black/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-800">
                            Pesan Anda
                        </label>
                        <textarea
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tulis pesan Anda..."
                            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 mt-2 text-black placeholder-neutral-400 focus:border-black focus:ring-2 focus:ring-black/20"
                        ></textarea>
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer py-3 font-semibold text-white md:w-auto md:px-12"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Kirim Pesan via WhatsApp
                    </motion.button>
                </motion.form>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
                className="mb-20 text-center"
            >
                <Link
                    href="/"
                    className="text-sm text-neutral-800 underline underline-offset-4 transition hover:text-black"
                >
                    ← Back to Home
                </Link>
            </motion.div>
        </section>
    );
}
