/**
 * Represents a consumable item in the system
 */
export interface ConsumableItem {
    id: number;
    name: string;
    sku: string | null;
    quantity: number;
    description?: string | null;
    category?: string | null;
    unit_of_measure?: string | null;
    created_at?: string;
    updated_at?: string;
}

/**
 * Represents a simplified consumable item reference (used in relationships)
 */
export interface ConsumableItemReference {
    id: number;
    name: string;
    sku: string | null;
}

/**
 * Available consumable item for borrowing (returned by API)
 */
export type AvailableConsumableItem = {
    id: number;
    name: string;
    sku: string | null;
    quantity: number;
    label?: string;
};
