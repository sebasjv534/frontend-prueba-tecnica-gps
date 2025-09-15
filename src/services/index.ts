/**
 * Exportaciones de servicios
 */

// Cliente HTTP base
export { httpClient } from './httpClient';

// Servicios
export { authService } from './authService';
export { vehicleService } from './vehicleService';

// Re-exportar tipos
export type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth';
export type { Vehicle, CreateVehicle, UpdateVehicle } from '@/types/vehicle';