/**
 * Interfaz genérica para respuestas de la API
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Interfaz para errores de la API
 */
export interface ApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

/**
 * Interfaz para respuestas paginadas
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

/**
 * Tipo para métodos HTTP
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Interfaz para opciones de configuración de fetch
 */
export interface FetchOptions extends RequestInit {
  timeout?: number;
  retryAttempts?: number;
}