export type BorrowingItem = {
    inventory_id: number | null;
    notes?: string;
};

export type BorrowingFormData = {
    start_at: string;
    end_at: string;
    notes: string;
    items: BorrowingItem[];
};

export type BorrowingsResponse = {
    id: number;
    start_at: string;
    end_at: string | null;
    notes: string | null;
    items: BorrowingItem[];
};

/** Shape returned by /api/inventories/available-inventories */
export type AvailableInventory = {
    id: number;
    name: string;
    serial_number: string;
    category: string | null;
    label: string; // "name (serial_number)"
};
