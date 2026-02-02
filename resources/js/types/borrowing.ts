export type BorrowingItem = {
    inventory_id: number | null;
    quantity: number;
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

