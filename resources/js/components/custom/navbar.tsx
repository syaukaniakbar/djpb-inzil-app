'use client';

import { useState, useEffect } from 'react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import { usePage, Link } from '@inertiajs/react';

const NAV_HEIGHT = 80;

/* Smooth Scroll */
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
        const hash = window.location.hash;
        if (!hash) return;

        const id = hash.replace('#', '');
        setTimeout(() => smoothScrollTo(id), 120);
    }, []);

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
                    ? 'bg-white/90 backdrop-blur-md shadow-sm'
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
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase text-gray-600">
                                INZIL APP
                            </span>
                            <span className="text-xs font-extrabold uppercase text-gray-900">
                                DITJEN PERBENDAHARAAN
                            </span>
                            <span className="text-xs font-semibold text-gray-600">
                                KANWIL DJPb PROV. KALTIM
                            </span>
                        </div>
                    </Link>

                    <ul className="hidden items-center gap-8 md:flex">
                        {links.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    onClick={(e) =>
                                        handleClick(e, item.href)
                                    }
                                    className={`text-sm font-medium transition ${item.isButton
                                        ? 'rounded bg-blue-700 px-6 py-2.5 text-white shadow-lg hover:bg-blue-800'
                                        : 'text-gray-600 hover:text-blue-700'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setOpen(true)}
                        className="rounded p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                        aria-label="Open menu"
                    >
                        <HiOutlineMenu size={28} />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-2xl md:hidden"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="flex items-center justify-between border-b px-6 py-5">
                                <span className="font-semibold">Menu</span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-full p-2 hover:bg-gray-100"
                                    aria-label="Close menu"
                                >
                                    <HiX size={28} />
                                </button>
                            </div>

                            <div className="flex flex-col space-y-2 p-6">
                                {links.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.1 + index * 0.05,
                                        }}
                                        onClick={(e) => {
                                            handleClick(e, item.href);
                                            setOpen(false);
                                        }}
                                        className={`rounded-lg px-4 py-3 text-base font-medium ${item.isButton
                                            ? 'mt-4 bg-blue-700 text-center text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
