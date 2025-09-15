'use client';

import { useState, useEffect, useCallback } from 'react';
import { Vehicle, CreateVehicle, UpdateVehicle } from '@/types';
import { vehicleService } from '@/services';

/**
 * Hook personalizado para manejar operaciones de vehículos
 */
export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga la lista de vehículos
   */
  const loadVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const vehiclesList = await vehicleService.getVehicles();
      setVehicles(vehiclesList);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar vehículos';
      setError(errorMessage);
      console.error('Error al cargar vehículos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Crea un nuevo vehículo
   */
  const createVehicle = async (vehicleData: CreateVehicle): Promise<Vehicle> => {
    try {
      setIsLoading(true);
      setError(null);

      const newVehicle = await vehicleService.createVehicle(vehicleData);
      
      // Actualizar la lista local
      setVehicles(prev => [...prev, newVehicle]);
      
      return newVehicle;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear vehículo';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Actualiza un vehículo existente
   */
  const updateVehicle = async (id: string, vehicleData: UpdateVehicle): Promise<Vehicle> => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedVehicle = await vehicleService.updateVehicle(id, vehicleData);
      
      // Actualizar la lista local
      setVehicles(prev => 
        prev.map(vehicle => 
          vehicle.id === id ? updatedVehicle : vehicle
        )
      );
      
      return updatedVehicle;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar vehículo';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Elimina un vehículo
   */
  const deleteVehicle = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await vehicleService.deleteVehicle(id);
      
      // Actualizar la lista local
      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar vehículo';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Busca vehículos por término
   */
  const searchVehicles = async (searchTerm: string): Promise<Vehicle[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const results = await vehicleService.searchVehicles(searchTerm);
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al buscar vehículos';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpia errores
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Carga inicial de vehículos
   */
  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  return {
    // Estado
    vehicles,
    isLoading,
    error,

    // Acciones
    loadVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    searchVehicles,
    clearError,
  };
}