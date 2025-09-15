/**
 * Interface para el modelo User basado en el backend
 */
export interface User {
  id: string; // UUID
  username: string;
  email: string;
  created_at: string; // ISO string date
}

/**
 * Interface para las credenciales de login
 */
export interface LoginCredentials {
  username: string; // Cambio: usar username en lugar de email
  password: string;
}

/**
 * Interface para el registro de usuario
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

/**
 * Interface para la respuesta de autenticación
 */
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}