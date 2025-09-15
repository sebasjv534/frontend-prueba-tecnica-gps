/**
 * Contexto global para manejar el estado de loading con indicadores mejorados
 */
'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  message?: string;
  retryCount?: number;
  maxRetries?: number;
}

interface LoadingContextType {
  loadingState: LoadingState;
  setLoading: (loading: boolean, message?: string) => void;
  setRetryLoading: (retryCount: number, maxRetries: number, message?: string) => void;
  clearLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
  });

  const setLoading = useCallback((loading: boolean, message?: string) => {
    setLoadingState({
      isLoading: loading,
      message,
      retryCount: undefined,
      maxRetries: undefined,
    });
  }, []);

  const setRetryLoading = useCallback((retryCount: number, maxRetries: number, message?: string) => {
    setLoadingState({
      isLoading: true,
      message,
      retryCount,
      maxRetries,
    });
  }, []);

  const clearLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
    });
  }, []);

  return (
    <LoadingContext.Provider value={{
      loadingState,
      setLoading,
      setRetryLoading,
      clearLoading,
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}

/**
 * Componente de loading global con indicador de reintentos
 */
export function GlobalLoadingIndicator() {
  const { loadingState } = useLoading();

  if (!loadingState.isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00249C]"></div>
          <div>
            <p className="text-gray-900 font-medium">
              {loadingState.message || 'Cargando...'}
            </p>
            {loadingState.retryCount && loadingState.maxRetries && (
              <p className="text-sm text-gray-600 mt-1">
                Intento {loadingState.retryCount} de {loadingState.maxRetries}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}