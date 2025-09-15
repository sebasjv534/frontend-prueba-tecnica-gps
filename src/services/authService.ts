import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';
import { setStorage, removeStorage, STORAGE_KEYS } from '@/utils';
import { httpClient } from './httpClient';

/**
 * Servicio para manejar la autenticación de usuarios
 */
class AuthService {
  /**
   * Inicia sesión con username y contraseña
   * @param credentials - Credenciales de login
   * @returns Respuesta de autenticación
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Enviar datos como JSON según tu backend
      const response = await httpClient.post<{ access_token: string; token_type: string }>('/auth/login', {
        username: credentials.username,
        password: credentials.password,
      });

      // Tu backend solo devuelve token, así que creamos un usuario temporal
      // basado en los datos de login
      const tempUser: User = {
        id: 'temp-' + Date.now(), // ID temporal hasta que tengas un endpoint de perfil
        username: credentials.username,
        email: credentials.username.includes('@') ? credentials.username : `${credentials.username}@temp.com`,
        created_at: new Date().toISOString(),
      };

      // Crear la respuesta de autenticación esperada por el frontend
      const authResponse: AuthResponse = {
        access_token: response.access_token,
        token_type: response.token_type,
        user: tempUser,
      };

      // Guardar token y datos del usuario en localStorage
      setStorage(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
      setStorage(STORAGE_KEYS.USER_DATA, tempUser);

      return authResponse;
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
      // Tu backend espera UserCreate y devuelve UserResponse
      const response = await httpClient.post<User>('/auth/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
      
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
    // Tu backend no tiene endpoint de logout, 
    // así que solo limpiamos los datos locales
    this.clearUserData();
  }

  /**
   * Obtiene el perfil del usuario actual
   * @returns Datos del usuario
   */
  async getCurrentUser(): Promise<User> {
    // Como tu backend no tiene endpoint /auth/me, 
    // usamos directamente los datos guardados localmente
    const userData = this.getUserData();
    
    if (!userData) {
      throw new Error('No hay datos de usuario disponibles. Por favor, inicia sesión.');
    }
    
    return userData;
  }

  /**
   * Actualiza el perfil del usuario
   * @param userData - Datos a actualizar
   * @returns Usuario actualizado
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    // Tu backend actual no tiene endpoint de actualización de perfil
    // Por ahora, solo actualizamos los datos locales
    const currentUser = this.getUserData();
    if (!currentUser) {
      throw new Error('No hay usuario autenticado');
    }
    
    const updatedUser = { ...currentUser, ...userData };
    setStorage(STORAGE_KEYS.USER_DATA, updatedUser);
    return updatedUser;
  }

  /**
   * Cambia la contraseña del usuario
   * @param currentPassword - Contraseña actual
   * @param newPassword - Nueva contraseña
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Tu backend actual no tiene endpoint de cambio de contraseña
    throw new Error('Funcionalidad de cambio de contraseña no disponible en el backend actual');
  }

  /**
   * Verifica si el token actual es válido
   * @returns true si el token es válido
   */
  async verifyToken(): Promise<boolean> {
    try {
      // Como no tienes endpoint /auth/me, verificamos si hay token y datos de usuario
      const token = this.getAccessToken();
      const userData = this.getUserData();
      
      return !!(token && userData);
    } catch {
      this.clearUserData();
      return false;
    }
  }

  /**
   * Limpia todos los datos del usuario de localStorage
   */
  clearUserData(): void {
    try {
      removeStorage(STORAGE_KEYS.ACCESS_TOKEN);
      removeStorage(STORAGE_KEYS.USER_DATA);
      
      // También limpiar cualquier dato corrupto que pueda haber
      if (typeof window !== 'undefined') {
        const keys = Object.values(STORAGE_KEYS);
        keys.forEach(key => {
          const value = localStorage.getItem(key);
          if (value === 'undefined' || value === 'null') {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      console.error('Error al limpiar datos de usuario:', error);
    }
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si está autenticado
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return !!(token && token !== 'undefined' && token !== 'null');
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      return false;
    }
  }

  /**
   * Obtiene el token de acceso actual
   * @returns Token de acceso o null
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      return token && token !== 'undefined' ? token : null;
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  }

  /**
   * Obtiene los datos del usuario desde localStorage
   * @returns Datos del usuario o null
   */
  getUserData(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (!userData || userData === 'undefined') return null;
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error al parsear datos del usuario:', error);
      // Limpiar datos corruptos
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      return null;
    }
  }
}

// Instancia singleton del servicio de autenticación
export const authService = new AuthService();