import Footer from '@/components/custom/footer';
import Navbar from '@/components/custom/navbar';
import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
