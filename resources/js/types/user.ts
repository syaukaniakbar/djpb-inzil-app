import type { Department } from '@/types/index.d';
import type { Position } from '@/types/index.d';

/**
 * Represents a user in the system
 */
export interface User {
    id: number;
    name: string;
    email: string;
    nip: string;
    phone: string | null;
    department_id: number;
    position_id: number;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    department?: Department;
    position?: Position;
}

/**
 * Represents a simplified user reference (used in relationships)
 */
export interface UserReference {
    id: number;
    name: string;
}
