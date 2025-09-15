import { apiClient } from './api';
import { LoginCredentials, RegisterData, AuthResponse, User } from '@/types/auth';

/**
 * Servicio para manejar la autenticación de usuarios
 */
export class AuthService {
  /**
   * Inicia sesión con username y password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // FastAPI espera form data para el endpoint de token
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Error al iniciar sesión');
      }

      const authData: AuthResponse = await response.json();

      // Guardar token y usuario en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', authData.access_token);
        localStorage.setItem('user', JSON.stringify(authData.user));
      }

      return authData;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Registra un nuevo usuario
   */
  async register(userData: RegisterData): Promise<User> {
    try {
      const user = await apiClient.post<User>('/auth/register', userData);
      return user;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }

  /**
   * Obtiene el usuario actual desde localStorage
   */
  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Obtiene el token de acceso actual
   */
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }

  /**
   * Obtiene el perfil del usuario autenticado desde el servidor
   */
  async getProfile(): Promise<User> {
    try {
      const user = await apiClient.get<User>('/auth/me');
      
      // Actualizar usuario en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return user;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();