import { Vehicle, CreateVehicle, UpdateVehicle } from '@/types';
import { httpClient } from './httpClient';

/**
 * Servicio para manejar las operaciones CRUD de vehículos
 */
class VehicleService {
  /**
   * Obtiene la lista de todos los vehículos
   * @returns Lista de vehículos
   */
  async getVehicles(): Promise<Vehicle[]> {
    try {
      const response = await httpClient.get<Vehicle[]>('/vehicles');
      return response;
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      throw error;
    }
  }

  /**
   * Obtiene un vehículo por su ID
   * @param id - ID del vehículo (UUID)
   * @returns Datos del vehículo
   */
  async getVehicleById(id: string): Promise<Vehicle> {
    try {
      const response = await httpClient.get<Vehicle>(`/vehicles/${id}`);
      return response;
    } catch (error) {
      console.error(`Error al obtener vehículo ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo vehículo
   * @param vehicleData - Datos del vehículo a crear
   * @returns Vehículo creado
   */
  async createVehicle(vehicleData: CreateVehicle): Promise<Vehicle> {
    try {
      const response = await httpClient.post<Vehicle>('/vehicles', vehicleData);
      return response;
    } catch (error) {
      console.error('Error al crear vehículo:', error);
      throw error;
    }
  }

  /**
   * Actualiza un vehículo existente
   * @param id - ID del vehículo (UUID)
   * @param vehicleData - Datos actualizados del vehículo
   * @returns Vehículo actualizado
   */
  async updateVehicle(id: string, vehicleData: UpdateVehicle): Promise<Vehicle> {
    try {
      const response = await httpClient.put<Vehicle>(`/vehicles/${id}`, vehicleData);
      return response;
    } catch (error) {
      console.error(`Error al actualizar vehículo ${id}:`, error);
      throw error;
    }
  }

  /**
   * Elimina un vehículo
   * @param id - ID del vehículo a eliminar (UUID)
   */
  async deleteVehicle(id: string): Promise<void> {
    try {
      await httpClient.delete(`/vehicles/${id}`);
    } catch (error) {
      console.error(`Error al eliminar vehículo ${id}:`, error);
      throw error;
    }
  }

  /**
   * Busca vehículos por término de búsqueda
   * @param searchTerm - Término de búsqueda
   * @returns Lista de vehículos que coinciden con la búsqueda
   */
  async searchVehicles(searchTerm: string): Promise<Vehicle[]> {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
      });

      const response = await httpClient.get<Vehicle[]>(
        `/vehicles/search?${params.toString()}`
      );
      return response;
    } catch (error) {
      console.error('Error al buscar vehículos:', error);
      throw error;
    }
  }
}

// Instancia singleton del servicio de vehículos
export const vehicleService = new VehicleService();