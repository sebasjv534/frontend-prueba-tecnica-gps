/**
 * Interfaz para el modelo de Usuario
 */
export interface User {
  id: number;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interfaz para las credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interfaz para el registro de usuario
 */
export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

/**
 * Interfaz para la respuesta de autenticación
 */
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}