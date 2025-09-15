/**
 * Configuración de variables de entorno
 */

// URL base de la API - fallback hardcodeado para producción
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-prueba-tecnica-gps.onrender.com/api/v1';
const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENV || 'production';

export const env = {
  // API Configuration
  API_URL: API_BASE_URL,
  APP_ENV: APP_ENVIRONMENT,
  
  // Configuración derivada
  IS_DEVELOPMENT: APP_ENVIRONMENT === 'development',
  IS_PRODUCTION: APP_ENVIRONMENT === 'production',
  
  // URLs de API específicas basadas en tu estructura
  API_ENDPOINTS: {
    AUTH: '/auth',           // https://backend-prueba-tecnica-gps.onrender.com/api/v1/auth/
    VEHICLES: '/vehicles',   // https://backend-prueba-tecnica-gps.onrender.com/api/v1/vehicles/
    USERS: '/users',
    HEALTH: '/health',
    // Endpoints específicos de auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',          // Endpoint para obtener usuario actual
    PROFILE: '/auth/profile', // Endpoint alternativo para el perfil
  }
} as const;

// Función para validar la configuración
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!env.API_URL) {
    errors.push('API_URL is required');
  }
  
  if (!env.API_URL.startsWith('http')) {
    errors.push('API_URL must be a valid URL');
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join('\n')}`);
  }
  
  return true;
};

// Log de configuración solo si hay debugging
if (typeof window !== 'undefined' && (env.IS_DEVELOPMENT || window.location.search.includes('debug'))) {
  console.log('🔧 Environment Configuration:', {
    API_URL: env.API_URL,
    APP_ENV: env.APP_ENV,
    ENDPOINTS: env.API_ENDPOINTS,
  });
}
