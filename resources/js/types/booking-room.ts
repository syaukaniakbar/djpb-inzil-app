import { LoanStatus } from '@/components/custom/status-badge';
import { PaginatedResponse } from '@/types/pagination';
import type { RoomReference } from '@/types/room';
import type { UserReference } from '@/types/user';

// ============================================================================
// Constants
// ============================================================================

export const EVENT_MODES = {
    online: 'Online',
    offline: 'Offline',
    hybrid: 'Hybrid',
} as const;

export type EventMode = keyof typeof EVENT_MODES;

// ============================================================================
// Form Data Types
// ============================================================================

/**
 * Form data structure for creating or updating a booking room
 */
export type BookingRoomFormData = {
    start_at: string;
    end_at: string;
    event_mode: string;
    event_name: string;
    room_id: number | null;
    admin_note?: string;
};

// ============================================================================
// Core Entity Types
// ============================================================================

/**
 * Represents a complete booking room record
 */
export interface BookingRoom {
    id: number;
    start_at: string;
    end_at: string;
    event_mode: string;
    event_name: string;
    status: LoanStatus;
    admin_note: string | null;
    user: UserReference | null;
    room: RoomReference;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Response type for booking room store/update operations
 */
export type BookingRoomResponse = {
    id: number;
    start_at: string;
    end_at: string | null;
    event_mode: string;
    event_name: string;
    room_id: number;
    admin_note: string | null;
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
 * Props for BookingRooms Index page
 */
export interface BookingRoomsIndexProps {
    bookings: PaginatedResponse<BookingRoom>;
    admin: AdminContact;
}

/**
 * Props for BookingRoom View/Show page
 */
export interface BookingRoomViewProps {
    booking: BookingRoom;
}

/**
 * Props for BookingRoom Edit page
 */
export interface BookingRoomEditProps {
    booking: {
        id: number;
        start_at: string;
        end_at: string | null;
        event_mode: string;
        event_name: string;
        status: string;
        admin_note: string | null;
        user: UserReference;
        room: RoomReference;
    };
}
