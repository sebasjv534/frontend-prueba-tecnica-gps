import { Vehicle, VehicleInput, VehicleFilters, PaginatedResponse } from '@/types';
import { httpClient } from './httpClient';

/**
 * Servicio para manejar las operaciones CRUD de vehículos
 */
class VehicleService {
  /**
   * Obtiene la lista de vehículos con filtros opcionales
   * @param filters - Filtros de búsqueda
   * @param page - Número de página (por defecto 1)
   * @param perPage - Elementos por página (por defecto 10)
   * @returns Lista paginada de vehículos
   */
  async getVehicles(
    filters: VehicleFilters = {},
    page: number = 1,
    perPage: number = 10
  ): Promise<PaginatedResponse<Vehicle>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
        ...Object.fromEntries(
          Object.entries(filters)
            .filter(([, value]) => value !== undefined && value !== '')
            .map(([key, value]) => [key, value.toString()])
        ),
      });

      const response = await httpClient.get<PaginatedResponse<Vehicle>>(
        `/vehicles?${params.toString()}`
      );
      return response;
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      throw error;
    }
  }

  /**
   * Obtiene un vehículo por su ID
   * @param id - ID del vehículo
   * @returns Datos del vehículo
   */
  async getVehicleById(id: number): Promise<Vehicle> {
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
  async createVehicle(vehicleData: VehicleInput): Promise<Vehicle> {
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
   * @param id - ID del vehículo
   * @param vehicleData - Datos actualizados del vehículo
   * @returns Vehículo actualizado
   */
  async updateVehicle(id: number, vehicleData: Partial<VehicleInput>): Promise<Vehicle> {
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
   * @param id - ID del vehículo a eliminar
   */
  async deleteVehicle(id: number): Promise<void> {
    try {
      await httpClient.delete(`/vehicles/${id}`);
    } catch (error) {
      console.error(`Error al eliminar vehículo ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cambia el estado de disponibilidad de un vehículo
   * @param id - ID del vehículo
   * @param disponible - Nuevo estado de disponibilidad
   * @returns Vehículo actualizado
   */
  async toggleAvailability(id: number, disponible: boolean): Promise<Vehicle> {
    try {
      const response = await httpClient.patch<Vehicle>(`/vehicles/${id}`, { disponible });
      return response;
    } catch (error) {
      console.error(`Error al cambiar disponibilidad del vehículo ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene vehículos del usuario actual
   * @param page - Número de página
   * @param perPage - Elementos por página
   * @returns Lista paginada de vehículos del usuario
   */
  async getMyVehicles(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Vehicle>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const response = await httpClient.get<PaginatedResponse<Vehicle>>(
        `/vehicles/my?${params.toString()}`
      );
      return response;
    } catch (error) {
      console.error('Error al obtener mis vehículos:', error);
      throw error;
    }
  }

  /**
   * Busca vehículos por término de búsqueda
   * @param searchTerm - Término de búsqueda
   * @param page - Número de página
   * @param perPage - Elementos por página
   * @returns Lista paginada de vehículos que coinciden con la búsqueda
   */
  async searchVehicles(
    searchTerm: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<PaginatedResponse<Vehicle>> {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        page: page.toString(),
        per_page: perPage.toString(),
      });

      const response = await httpClient.get<PaginatedResponse<Vehicle>>(
        `/vehicles/search?${params.toString()}`
      );
      return response;
    } catch (error) {
      console.error('Error al buscar vehículos:', error);
      throw error;
    }
  }

  /**
   * Obtiene estadísticas de vehículos
   * @returns Estadísticas básicas
   */
  async getVehicleStats(): Promise<{
    total: number;
    disponibles: number;
    no_disponibles: number;
    por_marca: Record<string, number>;
  }> {
    try {
      const response = await httpClient.get<{
        total: number;
        disponibles: number;
        no_disponibles: number;
        por_marca: Record<string, number>;
      }>('/vehicles/stats');
      return response;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }
}

// Instancia singleton del servicio de vehículos
export const vehicleService = new VehicleService();