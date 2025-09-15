import { ApiError as IApiError, FetchOptions, HttpMethod } from '@/types';
import { getStorage, STORAGE_KEYS } from '@/utils';
import { env } from '@/config/env';

/**
 * Configuración base para la API
 */
const API_CONFIG = {
  baseURL: env.API_URL,
  timeout: env.IS_PRODUCTION ? 30000 : 15000, // 30s en prod, 15s en dev
  retryAttempts: 3,
  retryDelay: 1000, // 1 segundo entre reintentos
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
   * Función auxiliar para hacer reintentos con delay exponencial
   */
  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Determina si un error es reintentable
   */
  private isRetryableError(error: unknown): boolean {
    if (error instanceof ApiError) {
      // Reintentar para errores de timeout, conexión o errores del servidor
      return error.status === 408 || error.status === 0 || error.status >= 500;
    }
    if (error instanceof Error) {
      // Reintentar para errores de red o timeout
      return error.name === 'AbortError' || error.name === 'TypeError';
    }
    return false;
  }

  /**
   * Realiza una petición HTTP genérica con reintentos automáticos
   */
  private async request<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    data?: unknown,
    options: FetchOptions = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const { 
      timeout = API_CONFIG.timeout, 
      headers: customHeaders, 
      retryAttempts = API_CONFIG.retryAttempts,
      ...restOptions 
    } = options;

    const config: RequestInit = {
      method,
      headers: this.getHeaders(customHeaders as Record<string, string>),
      ...restOptions,
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      config.body = JSON.stringify(data);
    }

    let lastError: unknown;

    // Intentar la petición con reintentos
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      let timeoutId: NodeJS.Timeout | undefined;
      
      try {
        console.log(`🔄 Intento ${attempt}/${retryAttempts} para ${method} ${endpoint}`);
        
        // Crear un AbortController para el timeout
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), timeout);

        config.signal = controller.signal;

        const response = await fetch(url, config);
        clearTimeout(timeoutId);

        const result = await this.handleResponse<T>(response);
        
        if (attempt > 1) {
          console.log(`✅ Petición exitosa después de ${attempt} intentos`);
        }
        
        return result;
      } catch (error) {
        lastError = error;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        console.warn(`❌ Intento ${attempt} fallido:`, error);

        // Si no es el último intento y el error es reintentable
        if (attempt < retryAttempts && this.isRetryableError(error)) {
          const delay = API_CONFIG.retryDelay * Math.pow(2, attempt - 1); // Delay exponencial
          console.log(`⏳ Esperando ${delay}ms antes del siguiente intento...`);
          await this.sleep(delay);
          continue;
        }

        // Si llegamos aquí, no hay más reintentos o el error no es reintentable
        break;
      }
    }

    // Manejar el último error
    if (lastError instanceof Error) {
      if (lastError.name === 'AbortError') {
        throw new ApiError({
          message: 'La petición ha excedido el tiempo límite. Verifique su conexión e intente nuevamente.',
          status: 408,
        });
      }
      throw new ApiError({
        message: lastError.message || 'Error de conexión. Verifique su conexión e intente nuevamente.',
        status: 0,
      });
    }
    
    throw lastError;
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