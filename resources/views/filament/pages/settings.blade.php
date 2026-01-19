<x-filament-panels::page>
    <x-filament::section heading="Account Information">

        <div style="
            max-width: 520px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
            font-size: 14px;
        ">

            {{-- Name --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Name
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                    font-weight:600;
                ">
                    {{ auth()->user()->name }}
                </div>
            </div>

            {{-- Email --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Email Address
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                ">
                    {{ auth()->user()->email }}
                </div>
            </div>

            {{-- Email Verified --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Email Verified At
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                ">
                    {{ auth()->user()->email_verified_at ?? '-' }}
                </div>
            </div>

            {{-- Role --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Role
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                    text-transform:capitalize;
                ">
                    {{ auth()->user()->role ?? 'admin' }}
                </div>
            </div>

            {{-- Jabatan --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Jabatan
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                ">
                    {{ auth()->user()->position_id ?? '-' }}
                </div>
            </div>

            {{-- Bidang --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Bidang
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                ">
                    {{ auth()->user()->department_id ?? '-' }}
                </div>
            </div>

            {{-- Created --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Created At
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                ">
                    {{ auth()->user()->created_at->format('M d, Y H:i:s') }}
                </div>
            </div>

            {{-- Updated --}}
            <div>
                <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
                    Last Updated
                </div>
                <div style="
                    padding:10px 12px;
                    border:1px solid #e5e7eb;
                    border-radius:8px;
                    background:#f9fafb;
                ">
                    {{ auth()->user()->updated_at->format('M d, Y H:i:s') }}
                </div>
            </div>

        </div>

    </x-filament::section>
</x-filament-panels::page>
