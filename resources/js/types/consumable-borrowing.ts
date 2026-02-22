import { LoanStatus } from '@/components/custom/status-badge';
import { PaginatedResponse } from '@/types/pagination';
import type { ConsumableItemReference, AvailableConsumableItem } from '@/types/consumable-item';
import type { UserReference } from '@/types/user';

// ============================================================================
// Form Data Types
// ============================================================================

/**
 * Form data structure for creating or updating a consumable borrowing
 */
export type ConsumableBorrowingFormData = {
    borrowed_at: string;
    consumable_item_id: number | null;
    quantity: number;
    notes: string;
};

// ============================================================================
// Core Entity Types
// ============================================================================

/**
 * Represents a complete consumable borrowing record
 */
export interface ConsumableBorrowing {
    id: number;
    borrowed_at: string;
    quantity: number;
    status: LoanStatus;
    notes: string | null;
    user: UserReference | null;
    consumable_item: ConsumableItemReference | null;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Response type for consumable borrowing store/update operations
 */
export type ConsumableBorrowingResponse = {
    id: number;
    borrowed_at: string;
    consumable_item_id: number;
    quantity: number;
    notes: string | null;
};

/**
 * Admin contact information
 */
export interface AdminContact {
    phone: string;
}

// ============================================================================
// Page Props Types
// ============================================================================

/**
 * Props for ConsumableBorrowings Index page
 */
export interface ConsumableBorrowingsIndexProps {
    borrowings: PaginatedResponse<ConsumableBorrowing>;
    admin: AdminContact;
    filters?: {
        search?: string;
        status?: string;
        borrowed_at_from?: string;
        borrowed_at_to?: string;
    };
}

/**
 * Props for ConsumableBorrowing View/Show page
 */
export interface ConsumableBorrowingViewProps {
    borrowing: ConsumableBorrowing;
}

/**
 * Props for ConsumableBorrowing Edit page
 */
export interface ConsumableBorrowingEditProps {
    consumableItems: AvailableConsumableItem[];
    borrowing: {
        id: number;
        borrowed_at: string;
        consumable_item_id: number;
        quantity: number;
        notes: string | null;
        status: string;
    };
}

/**
 * Props for ConsumableBorrowing Create page
 */
export interface ConsumableBorrowingCreateProps {
    consumableItems: AvailableConsumableItem[];
}
