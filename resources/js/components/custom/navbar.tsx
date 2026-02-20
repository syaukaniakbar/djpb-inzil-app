'use client';

import { useState, useEffect } from 'react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import { usePage, Link } from '@inertiajs/react';

const NAV_HEIGHT = 80;

const smoothScrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (!el) return;

    const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        NAV_HEIGHT;

    window.scrollTo({
        top: y,
        behavior: 'smooth',
    });
};

const navLinks = [
    { name: 'Beranda', href: '/', isButton: false },
    { name: 'Layanan', href: '#service', isButton: false },
    { name: 'Tentang Inzil', href: '#about', isButton: false },
    { name: 'Contact Us', href: '/contact-us', isButton: true },
];

type NavLink = typeof navLinks[number];

type NavbarProps = {
    links?: NavLink[];
};

export default function Navbar({ links = navLinks }: NavbarProps) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { url } = usePage();
    const isHome = url === '/' || url === '';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ): void => {
        if (!href.startsWith('#')) return;

        e.preventDefault();
        const sectionId = href.replace('#', '');

        if (isHome) {
            smoothScrollTo(sectionId);
        } else {
            window.location.href = `/#${sectionId}`;
        }
    };

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            <nav
                className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
                    ? 'bg-white shadow-md'
                    : 'bg-white'
                    }`}
            >
                <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 md:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/images/kemenkeu-logo.png"
                            className="h-12 w-auto object-contain"
                            alt="Logo Kemenkeu"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="text-xs font-bold uppercase text-gray-700">
                                INZIL APP
                            </span>
                            <span className="text-xs font-extrabold uppercase text-gray-900">
                                DITJEN PERBENDAHARAAN
                            </span>
                            <span className="text-xs font-semibold text-gray-700">
                                KANWIL DJPb PROV. KALTIM
                            </span>
                        </div>
                    </Link>

                    {/* Desktop */}
                    <ul className="hidden items-center gap-10 md:flex">
                        {links.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href)}
                                    className={`text-sm transition ${item.isButton
                                        ? 'rounded bg-blue-700 px-6 py-2.5 text-white hover:bg-blue-800'
                                        : 'text-gray-800 hover:text-blue-700'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="rounded-lg p-2 text-gray-800 hover:bg-gray-100 md:hidden"
                        aria-label="Open menu"
                    >
                        <HiOutlineMenu size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setOpen(false)}
                        />

                        {/* Drawer (Smooth Fade + Scale) */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-900">
                                        Menu
                                    </span>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="rounded-full p-2 text-red-600 hover:bg-red-50"
                                    >
                                        <HiX size={26} />
                                    </button>
                                </div>

                                <div className="flex flex-col space-y-3">
                                    {links.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={(e) => {
                                                handleClick(e, item.href);
                                                setOpen(false);
                                            }}
                                            className={`rounded-lg px-4 py-3 text-base font-semibold transition ${item.isButton
                                                ? 'mt-3 bg-blue-700 text-center text-white hover:bg-blue-800'
                                                : 'text-gray-800 hover:bg-gray-100'
                                                }`}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
