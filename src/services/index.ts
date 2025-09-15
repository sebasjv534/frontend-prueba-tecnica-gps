/**
 * Exportaciones de servicios
 */

// Cliente API base
export { apiClient } from './api';

// Servicios
export { AuthService, authService } from './auth';
export { VehicleService, vehicleService } from './vehicles';

// Re-exportar tipos
export type { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth';
export type { Vehicle, CreateVehicle, UpdateVehicle } from '@/types/vehicle';