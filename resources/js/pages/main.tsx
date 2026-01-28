import About from '@/components/custom/about';
import Hero from '@/components/custom/hero';
import Service from '@/components/custom/service';
import MainLayout from '@/layouts/main-layout';

function Main() {
    return (
        <MainLayout>
            <Hero />
            <Service />
            <About />
        </MainLayout>
    );
}

export default Main;
