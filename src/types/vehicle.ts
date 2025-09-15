/**
 * Interfaz para el modelo de Vehículo
 */
export interface Vehicle {
  id: number;
  marca: string;
  modelo: string;
  año: number;
  color: string;
  precio: number;
  descripcion?: string;
  disponible: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

/**
 * Interfaz para crear/actualizar un vehículo
 */
export interface VehicleInput {
  marca: string;
  modelo: string;
  año: number;
  color: string;
  precio: number;
  descripcion?: string;
  disponible?: boolean;
}

/**
 * Interfaz para filtros de búsqueda de vehículos
 */
export interface VehicleFilters {
  marca?: string;
  modelo?: string;
  año_min?: number;
  año_max?: number;
  precio_min?: number;
  precio_max?: number;
  color?: string;
  disponible?: boolean;
}