import { LoanStatus } from '@/components/custom/status-badge';
import { PaginatedResponse } from '@/types/pagination';
import type { VehicleReference } from '@/types/vehicle';
import type { UserReference } from '@/types/user';

// ============================================================================
// Constants
// ============================================================================

export const PURPOSES = {
    dalam_kota: 'Dalam Kota',
    luar_kota: 'Luar Kota',
} as const;

export type Purpose = keyof typeof PURPOSES;

// ============================================================================
// Form Data Types
// ============================================================================

/**
 * Form data structure for creating or updating a vehicle borrowing
 */
export type VehicleBorrowingFormData = {
    start_at: string;
    end_at: string;
    purpose: string;
    destination: string;
    vehicle_id: number | null;
};

// ============================================================================
// Core Entity Types
// ============================================================================

/**
 * Represents a complete vehicle borrowing record
 */
export interface VehicleBorrowing {
    id: number;
    start_at: string;
    end_at: string;
    returned_at: string | null;
    purpose: string;
    destination: string;
    status: LoanStatus;
    admin_note: string | null;
    user: UserReference | null;
    vehicle: VehicleReference;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Response type for vehicle borrowing store/update operations
 */
export type VehicleBorrowingResponse = {
    id: number;
    start_at: string;
    end_at: string | null;
    purpose: string;
    destination: string;
    vehicle_id: number;
};

/**
 * Admin contact information
 */
export interface AdminContact {
    id: number;
    name: string;
    phone: string;
}

// ============================================================================
// Page Props Types
// ============================================================================

/**
 * Props for VehicleBorrowings Index page
 */
export interface VehicleBorrowingsIndexProps {
    borrowings: PaginatedResponse<VehicleBorrowing>;
    admin: AdminContact;
    filters?: {
        search?: string;
        status?: string;
        start_at_from?: string;
        start_at_to?: string;
    };
}

/**
 * Props for VehicleBorrowing View/Show page
 */
export interface VehicleBorrowingViewProps {
    borrowing: VehicleBorrowing;
}

/**
 * Props for VehicleBorrowing Edit page
 */
export interface VehicleBorrowingEditProps {
    borrowing: {
        id: number;
        start_at: string;
        end_at: string | null;
        returned_at: string | null;
        purpose: string;
        destination: string;
        status: string;
        admin_note: string | null;
        user: UserReference;
        vehicle: VehicleReference;
    };
}
