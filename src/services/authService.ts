import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';
import { setStorage, removeStorage, STORAGE_KEYS } from '@/utils';
import { httpClient } from './httpClient';

/**
 * Servicio para manejar la autenticación de usuarios
 */
class AuthService {
  /**
   * Inicia sesión con email y contraseña
   * @param credentials - Credenciales de login
   * @returns Respuesta de autenticación
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // El backend espera los datos como FormData para OAuth2
      const formData = new FormData();
      formData.append('username', credentials.email); // OAuth2 usa 'username'
      formData.append('password', credentials.password);

      const response = await httpClient.post<AuthResponse>('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Guardar token y datos del usuario en localStorage
      setStorage(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
      setStorage(STORAGE_KEYS.USER_DATA, response.user);

      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Registra un nuevo usuario
   * @param userData - Datos del usuario a registrar
   * @returns Usuario registrado
   */
  async register(userData: RegisterData): Promise<User> {
    try {
      const response = await httpClient.post<User>('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout(): Promise<void> {
    try {
      // Intentar cerrar sesión en el servidor
      await httpClient.post('/auth/logout');
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
      // Continuar con el logout local aunque falle el servidor
    } finally {
      // Limpiar datos locales
      this.clearUserData();
    }
  }

  /**
   * Obtiene el perfil del usuario actual
   * @returns Datos del usuario
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await httpClient.get<User>('/auth/me');
      // Actualizar datos del usuario en localStorage
      setStorage(STORAGE_KEYS.USER_DATA, response);
      return response;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      throw error;
    }
  }

  /**
   * Actualiza el perfil del usuario
   * @param userData - Datos a actualizar
   * @returns Usuario actualizado
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await httpClient.put<User>('/auth/me', userData);
      // Actualizar datos del usuario en localStorage
      setStorage(STORAGE_KEYS.USER_DATA, response);
      return response;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  }

  /**
   * Cambia la contraseña del usuario
   * @param currentPassword - Contraseña actual
   * @param newPassword - Nueva contraseña
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await httpClient.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  }

  /**
   * Verifica si el token actual es válido
   * @returns true si el token es válido
   */
  async verifyToken(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      this.clearUserData();
      return false;
    }
  }

  /**
   * Limpia todos los datos del usuario de localStorage
   */
  clearUserData(): void {
    removeStorage(STORAGE_KEYS.ACCESS_TOKEN);
    removeStorage(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si está autenticado
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!token;
  }

  /**
   * Obtiene el token de acceso actual
   * @returns Token de acceso o null
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Obtiene los datos del usuario desde localStorage
   * @returns Datos del usuario o null
   */
  getUserData(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }
}

// Instancia singleton del servicio de autenticación
export const authService = new AuthService();