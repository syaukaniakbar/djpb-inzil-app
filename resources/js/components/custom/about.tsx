export default function About() {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative flex items-center justify-center bg-black px-6 py-28 sm:py-32"
        >
            <div className="mx-auto max-w-5xl text-center">
                {/* Heading */}
                <h1
                    id="hero-heading"
                    className="font-hedvig text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                    Manajemen <span className="text-blue-400">peminjaman</span>{' '}
                    dan{' '}
                    <span className="text-blue-400">aset perbendaharaan</span>{' '}
                    yang lebih <span className="text-blue-400">tertib</span>,{' '}
                    <span className="text-blue-400">transparan</span>, dan{' '}
                    <span className="text-blue-400">terkendali</span>
                </h1>

                {/* Trust text */}
                <p className="mt-12 text-sm text-gray-400">
                    Trusted by{' '}
                    <span className="font-medium text-gray-300">1,000+</span>{' '}
                    teams and professionals worldwide
                </p>

                {/* Logos */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-80">
                    {[
                        'Nietzsche',
                        'Boltshift',
                        'Boltshift',
                        'Lightbox',
                        'FeatherDev',
                    ].map((brand) => (
                        <span
                            key={brand}
                            className="flex items-center gap-2 text-sm font-medium text-gray-300"
                        >
                            <span className="h-4 w-4 rounded-full bg-gray-500" />
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
