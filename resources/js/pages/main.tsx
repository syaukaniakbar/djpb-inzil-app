import About from '@/components/custom/about';
import Hero from '@/components/custom/hero';
import Service from '@/components/custom/service';
import MainLayout from '@/layouts/main-layout';
import { useEffect } from 'react';

const NAV_HEIGHT = 80;

function Main() {
    useEffect(() => {
        // Handle smooth scroll when page loads with hash
        const hash = window.location.hash;
        if (hash) {
            const id = hash.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                // Small delay to ensure page is fully rendered
                setTimeout(() => {
                    const y = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth',
                    });
                }, 100);
            }
        }
    }, []);

    return (
        <MainLayout>
            <Hero />
            <Service />
            <About />
        </MainLayout>
    );
}

export default Main;
