<x-filament-panels::page>
    <div class="space-y-6">
        {{ $this->infolist }}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {{ $this->stats }}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl shadow p-6">
                {{ $this->latestBorrowings }}
            </div>

            <div class="bg-white rounded-xl shadow p-6">
                {{ $this->latestVehicleBorrowings }}
            </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
            {{ $this->latestBookingRooms }}
        </div>
    </div>

    <script>
        // Auto-refresh the dashboard every 5 minutes
        setInterval(() => {
            window.location.reload();
        }, 300000);
    </script>
</x-filament-panels::page>