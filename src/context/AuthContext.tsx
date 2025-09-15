'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';
import { authService } from '@/services';

/**
 * Interface para el contexto de autenticación
 */
interface AuthContextType {
  // Estado
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Acciones
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

/**
 * Contexto de autenticación
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props para el proveedor de autenticación
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto de autenticación
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user && authService.isAuthenticated();

  /**
   * Inicializa el estado de autenticación al cargar la app
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Verificar si hay un token válido
        if (authService.isAuthenticated()) {
          // Intentar obtener el usuario actual del servidor
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // Si falla, usar datos del localStorage como fallback
            const userData = authService.getUserData();
            if (userData) {
              setUser(userData);
            } else {
              // Si no hay datos válidos, limpiar todo
              authService.clearUserData();
            }
          }
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        authService.clearUserData();
        setError('Error al verificar autenticación');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Inicia sesión
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response: AuthResponse = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registra un nuevo usuario
   */
  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      await authService.register(userData);
      // Después del registro exitoso, hacer login automático
      await login({
        username: userData.username,
        password: userData.password,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cierra sesión
   */
  const logout = () => {
    setUser(null);
    setError(null);
    authService.logout();
  };

  /**
   * Limpia errores
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Actualiza los datos del usuario desde el servidor
   */
  const refreshUser = async () => {
    try {
      if (!isAuthenticated) return;
      
      setIsLoading(true);
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      // Si falla, mantener los datos locales
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar el contexto de autenticación
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
}