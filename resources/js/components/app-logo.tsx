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
                <span className="text-[11px] font-semibold text-white">
                    INZIL APP
                </span>

                <span className="text-[10px] font-medium text-[#d4af37]">
                    DITJEN PERBENDAHARAAN
                </span>

                <span className="text-[9.5px] font-normal text-white/70">
                    KANWIL DJPb PROV. KALTIM
                </span>
            </div>
        </>
    );
}
