<x-filament-panels::page>
    <x-filament::section heading="Account Information">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

            <div>
                <div class="text-gray-500">Name</div>
                <div class="font-semibold">
                    {{ auth()->user()->name }}
                </div>
            </div>

            <div>
                <div class="text-gray-500">Email address</div>
                <div class="font-semibold">
                    {{ auth()->user()->email }}
                </div>
            </div>

            <div>
                <div class="text-gray-500">Email verified at</div>
                <div class="font-semibold">
                    {{ auth()->user()->email_verified_at ?? '-' }}
                </div>
            </div>

            <div>
                <div class="text-gray-500">Role</div>
                <div class="font-semibold">
                    {{ auth()->user()->role ?? 'admin' }}
                </div>
            </div>

            <div>
                <div class="text-gray-500">Jabatan</div>
                <div class="font-semibold">
                    {{ auth()->user()->position ?? '-' }}
                </div>
            </div>

            <div>
                <div class="text-gray-500">Bidang</div>
                <div class="font-semibold">
                    {{ auth()->user()->department ?? '-' }}
                </div>
            </div>

            <div>
                <div class="text-gray-500">Created at</div>
                <div class="font-semibold">
                    {{ auth()->user()->created_at->format('M d, Y H:i:s') }}
                </div>
            </div>

            <div>
                <div class="text-gray-500">Updated at</div>
                <div class="font-semibold">
                    {{ auth()->user()->updated_at->format('M d, Y H:i:s') }}
                </div>
            </div>

        </div>
    </x-filament::section>
</x-filament-panels::page>
