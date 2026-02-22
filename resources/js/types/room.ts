/**
 * Represents a room in the system
 */
export interface Room {
    id: number;
    name: string;
    capacity: number;
    description?: string | null;
    location?: string | null;
    facilities?: string[] | null;
    created_at?: string;
    updated_at?: string;
}

/**
 * Represents a simplified room reference (used in relationships)
 */
export interface RoomReference {
    id: number;
    name: string;
    capacity: number;
}

/**
 * Available room for booking (returned by API)
 */
export type AvailableRoom = {
    id: number;
    name: string;
    capacity: number;
    label?: string;
};
