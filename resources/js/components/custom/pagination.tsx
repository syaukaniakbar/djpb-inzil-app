import { router } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page?: number;
    total: number;

}

interface PaginationProps {
    links?: PaginationLink[];
    meta?: PaginationMeta;
}

export default function Pagination({ links, meta }: PaginationProps) {
    if (!links || links.length <= 2) return null;

    const perPage = meta?.per_page ?? 10;

    return (
        <div className="mt-4 flex flex-col items-center border-t border-gray-100 px-4 py-3">
            <div className="flex flex-wrap items-center justify-center gap-1">
                {links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (link.url && !link.active) {
                                const url = new URL(link.url);
                                const params: Record<string, string> = {};

                                for (const [key, value] of url.searchParams.entries()) {
                                    params[key] = value;
                                }

                                router.get(window.location.pathname, params, {
                                    preserveState: true,
                                    preserveScroll: true,
                                    replace: true,
                                });
                            }
                        }}
                        disabled={!link.url || link.active}
                        className={`rounded px-3 py-2 text-sm ${link.active
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } ${!link.url || link.active
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>

            {meta && (
                <div className="mt-3 text-sm text-gray-600">
                    Showing{' '}
                    {(meta.current_page - 1) * perPage + 1}
                    -
                    {Math.min(meta.current_page * perPage, meta.total)}{' '}
                    of {meta.total} records
                </div>
            )}
        </div>
    );
}
