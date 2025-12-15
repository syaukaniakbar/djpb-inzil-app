import About from '@/components/custom/about';
import Hero from '@/components/custom/hero';
import PhoneHero from '@/components/custom/phone-hero';
import Service from '@/components/custom/service';
import MainLayout from '@/layouts/main-layout';

function Main() {
    return (
        <MainLayout>
            <Hero />
            <PhoneHero />
            <Service />
            <About />
        </MainLayout>
    );
}

export default Main;
