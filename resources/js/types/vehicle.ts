/**
 * Represents a vehicle in the system
 */
export interface Vehicle {
    id: number;
    name: string;
    license_plate: string;
    brand: string;
    model: string;
    color: string;
    fuel_type: string;
    registration_expiry: string;
    year: number;
    description?: string | null;
    created_at?: string;
    updated_at?: string;
}

/**
 * Represents a simplified vehicle reference (used in relationships)
 * Includes essential fields for display in borrowing records
 */
export interface VehicleReference {
    id: number;
    name: string;
    license_plate: string;
    brand?: string;
    model?: string;
    year?: number;
    fuel_type?: string;
}

/**
 * Available vehicle for borrowing (returned by API)
 */
export type AvailableVehicle = {
    id: number;
    name: string;
    license_plate: string;
    label?: string;
};
