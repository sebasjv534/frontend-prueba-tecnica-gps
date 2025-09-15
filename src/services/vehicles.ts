import { apiClient } from './api';
import { Vehicle, CreateVehicle, UpdateVehicle } from '@/types/vehicle';

/**
 * Servicio para manejar operaciones CRUD de vehículos
 */
export class VehicleService {
  /**
   * Obtiene todos los vehículos
   */
  async getVehicles(): Promise<Vehicle[]> {
    try {
      const vehicles = await apiClient.get<Vehicle[]>('/vehicles');
      return vehicles;
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      throw error;
    }
  }

  /**
   * Obtiene un vehículo por ID
   */
  async getVehicle(id: string): Promise<Vehicle> {
    try {
      const vehicle = await apiClient.get<Vehicle>(`/vehicles/${id}`);
      return vehicle;
    } catch (error) {
      console.error('Error al obtener vehículo:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo vehículo
   */
  async createVehicle(vehicleData: CreateVehicle): Promise<Vehicle> {
    try {
      const vehicle = await apiClient.post<Vehicle>('/vehicles', vehicleData);
      return vehicle;
    } catch (error) {
      console.error('Error al crear vehículo:', error);
      throw error;
    }
  }

  /**
   * Actualiza un vehículo existente
   */
  async updateVehicle(id: string, vehicleData: UpdateVehicle): Promise<Vehicle> {
    try {
      const vehicle = await apiClient.put<Vehicle>(`/vehicles/${id}`, vehicleData);
      return vehicle;
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
      throw error;
    }
  }

  /**
   * Elimina un vehículo
   */
  async deleteVehicle(id: string): Promise<void> {
    try {
      await apiClient.delete(`/vehicles/${id}`);
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      throw error;
    }
  }
}

export const vehicleService = new VehicleService();