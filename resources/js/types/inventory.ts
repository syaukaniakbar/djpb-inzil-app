export interface Inventory {
    id: number
    name: string
    serial_number: string
    description: string | null
    category: string
    quantity: number
    available_quantity: number
}


export type InventoryForm = Pick<
    Inventory,
    'name' | 'serial_number' | 'category' | 'quantity'
>