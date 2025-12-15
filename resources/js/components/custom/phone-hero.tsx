'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function PhoneHero() {
    const { scrollY } = useScroll();

    // Animasi lebih terasa tapi tetap elegan
    const y = useTransform(scrollY, [0, 600], [0, 40]);
    const rotateX = useTransform(scrollY, [0, 400], [0, 8]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

    return (
        <div
            className="relative mt-16 flex h-[40rem] justify-center overflow-hidden border-b"
            style={{ perspective: 1200 }}
        >
            <motion.div
                className="relative"
                style={{
                    y,
                    rotateX,
                    scale,
                    transformStyle: 'preserve-3d',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 40,
                    damping: 18,
                    mass: 1,
                }}
            >
                {/* Screen content */}
                <img
                    src="/images/content.png"
                    alt="App content"
                    className="pointer-events-none absolute top-5 left-1/2 z-0 w-[92%] -translate-x-1/2 object-cover"
                    style={{ clipPath: 'inset(0 round 48px)' }}
                />

                {/* Phone frame */}
                <img
                    src="/images/phone.avif"
                    alt="Phone mockup"
                    className="pointer-events-none relative z-20 w-[280px] md:w-[420px]"
                />
            </motion.div>
        </div>
    );
}
