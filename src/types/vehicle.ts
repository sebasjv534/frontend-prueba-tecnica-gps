/**
 * Interface para el modelo Vehicle basado en el backend
 */
export interface Vehicle {
  id: string; // UUID
  brand: string; // Marca
  arrival_location: string; // Sucursal
  applicant: string; // Aspirante
  created_at: string; // ISO string date
  updated_at?: string; // ISO string date, opcional para nuevos vehículos
}

/**
 * Interface para crear un nuevo vehículo (sin campos generados automáticamente)
 */
export interface CreateVehicle {
  brand: string; // Marca
  arrival_location: string; // Sucursal
  applicant: string; // Aspirante
}

/**
 * Interface para actualizar un vehículo existente
 */
export interface UpdateVehicle {
  brand?: string; // Marca
  arrival_location?: string; // Sucursal
  applicant?: string; // Aspirante
}