import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-lg">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-64 w-64 items-center justify-center rounded-md">
                                <div className="flex aspect-square size-12 items-center justify-center rounded-md">
                                    <img
                                        src="/images/kemenkeu-logo.png"
                                        alt="Kemenkeu Logo"
                                        className="h-12 w-12 object-contain"
                                    />
                                </div>

                                <div className="ml-1 flex flex-col leading-tight">
                                    <span className="text-[11px] font-semibold text-gray-900">
                                        INZIL APP
                                    </span>

                                    <span className="text-[10px] font-medium text-gray-700">
                                        DITJEN PERBENDAHARAAN
                                    </span>

                                    <span className="text-[9.5px] font-normal text-gray-500">
                                        KANWIL DJPb PROV. KALTIM
                                    </span>
                                </div>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
