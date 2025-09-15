import { ApiError as IApiError, FetchOptions, HttpMethod } from '@/types';
import { getStorage, STORAGE_KEYS } from '@/utils';
import { env } from '@/config/env';

/**
 * Configuración base para la API
 */
const API_CONFIG = {
  baseURL: env.API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Clase base para manejar las peticiones HTTP
 */
class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = API_CONFIG.headers;
  }

  /**
   * Obtiene los headers con autorización si existe token
   */
  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const token = getStorage<string>(STORAGE_KEYS.ACCESS_TOKEN);
    const headers = { ...this.defaultHeaders, ...customHeaders };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Maneja las respuestas HTTP y errores
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      let errorDetails = {};

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.detail || errorMessage;
        errorDetails = errorData;
      } catch {
        // Si no se puede parsear el JSON, usar el mensaje por defecto
      }

      throw new ApiError({
        message: errorMessage,
        status: response.status,
        details: errorDetails,
      });
    }

    // Si la respuesta está vacía (204 No Content), retornar null
    if (response.status === 204) {
      return null as T;
    }

    try {
      return await response.json();
    } catch {
      return null as T;
    }
  }

  /**
   * Realiza una petición HTTP genérica
   */
  private async request<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const { timeout = API_CONFIG.timeout, headers: customHeaders, ...restOptions } = options;

    const config: RequestInit = {
      method,
      headers: this.getHeaders(customHeaders as Record<string, string>),
      ...restOptions,
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      config.body = JSON.stringify(data);
    }

    try {
      // Crear un AbortController para el timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      config.signal = controller.signal;

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError({
            message: 'La petición ha excedido el tiempo límite',
            status: 408,
          });
        }
        throw new ApiError({
          message: error.message || 'Error de conexión',
          status: 0,
        });
      }
      throw error;
    }
  }

  /**
   * Métodos HTTP específicos
   */
  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, options);
  }

  async post<T>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, 'POST', data, options);
  }

  async put<T>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data, options);
  }

  async patch<T>(endpoint: string, data?: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', data, options);
  }

  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, options);
  }
}

/**
 * Clase personalizada para errores de API
 */
class ApiError extends Error {
  public status: number;
  public details?: Record<string, unknown>;

  constructor({ message, status, details }: { message: string; status: number; details?: Record<string, unknown> }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// Instancia singleton del cliente HTTP
export const httpClient = new HttpClient();
export { ApiError };