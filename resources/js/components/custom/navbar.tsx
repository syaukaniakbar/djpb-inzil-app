import { useState } from 'react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

const navLinks = [
    { name: 'Beranda', href: '#', isButton: false },
    { name: 'Layanan', href: '#', isButton: false },
    { name: 'Tentang Inzil', href: '#', isButton: false },
    { name: 'Contact Us', href: '/contact-us', isButton: true },
];

export default function Navbar({ links = navLinks }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* NAVBAR */}
            <nav className="sticky top-0 z-40 w-full bg-white">
                <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 md:px-8">
                    {/* BRANDING */}
                    <a href="#" className="group flex items-center gap-3">
                        <img
                            src="/images/kemenkeu-logo.png"
                            className="h-11 w-auto transition-transform duration-300 group-hover:scale-[1.05] md:h-14"
                            alt="Logo Kemenkeu"
                        />

                        <div className="leading-tight">
                            <h1 className="text-xs font-semibold tracking-wide text-neutral-900 md:text-sm">
                                KEMENKEU RI
                            </h1>
                            <p className="text-[10px] leading-tight text-neutral-600 md:text-[13px]">
                                Ditjen Perbendaharaan
                                <br />
                                Kanwil Prov. Kaltim
                            </p>
                        </div>
                    </a>

                    {/* DESKTOP NAV */}
                    <ul className="hidden items-center gap-10 text-[15px] font-medium text-neutral-700 md:flex">
                        {links.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={
                                        item.isButton
                                            ? 'rounded-xl bg-blue-700 px-6 py-3 text-white shadow-sm transition-all hover:bg-blue-800 hover:shadow-md'
                                            : 'relative px-2 py-1 transition-colors hover:text-neutral-900'
                                    }
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="block rounded-lg p-2 text-neutral-700 transition hover:bg-neutral-100 md:hidden"
                        onClick={() => setOpen(true)}
                        aria-label="Open menu"
                    >
                        <HiOutlineMenu size={28} />
                    </button>
                </div>
            </nav>

            {/* OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* MOBILE DRAWER */}
            <div
                className={`fixed top-0 right-0 z-40 h-full w-72 rounded-l-2xl bg-white shadow-2xl transition-transform duration-300 md:hidden ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
                    <span className="text-lg font-semibold text-neutral-900">
                        Menu
                    </span>

                    <button
                        className="rounded-lg p-2 text-neutral-700 transition hover:bg-neutral-100"
                        aria-label="Close menu"
                        onClick={() => setOpen(false)}
                    >
                        <HiX size={28} />
                    </button>
                </div>

                {/* MOBILE LINKS */}
                <div className="flex flex-col space-y-5 px-6 py-6 text-[16px] font-medium text-neutral-700">
                    {links.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={
                                item.isButton
                                    ? 'mt-3 rounded-xl bg-blue-700 px-4 py-3 text-center text-white shadow-sm transition-all hover:bg-blue-800 hover:shadow-md'
                                    : 'border-b border-neutral-100 pb-3 transition-colors hover:text-neutral-900'
                            }
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
