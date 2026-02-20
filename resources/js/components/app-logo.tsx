export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                <img
                    src="/images/kemenkeu-logo.png"
                    alt="Kemenkeu Logo"
                    className="h-8 w-8 object-contain"
                />
            </div>

            <div className="ml-1 flex flex-col leading-tight">
                <span className="text-[11px] font-semibold text-gray-900 dark:text-white">
                    INZIL APP
                </span>

                <span className="text-[10px] font-medium text-gray-700 dark:text-white/80">
                    DITJEN PERBENDAHARAAN
                </span>

                <span className="text-[9.5px] font-normal text-gray-500 dark:text-white/60">
                    KANWIL DJPb PROV. KALTIM
                </span>
            </div>
        </>
    );
}
