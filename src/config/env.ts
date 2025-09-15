/**
 * Configuración de variables de entorno
 */

// Validar variables de entorno requeridas
const requiredEnvVars = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
} as const;

// Verificar que las variables requeridas estén definidas
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value && key === 'NEXT_PUBLIC_API_URL') {
    console.warn(`⚠️  Variable de entorno requerida no definida: ${key}`);
  }
}

export const env = {
  // API Configuration
  API_URL: requiredEnvVars.NEXT_PUBLIC_API_URL || 'https://backend-prueba-tecnica-gps.onrender.com/api/v1',
  APP_ENV: requiredEnvVars.NEXT_PUBLIC_APP_ENV,
  
  // Configuración derivada
  IS_DEVELOPMENT: requiredEnvVars.NEXT_PUBLIC_APP_ENV === 'development',
  IS_PRODUCTION: requiredEnvVars.NEXT_PUBLIC_APP_ENV === 'production',
  
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
    errors.push('NEXT_PUBLIC_API_URL is required');
  }
  
  if (!env.API_URL.startsWith('http')) {
    errors.push('NEXT_PUBLIC_API_URL must be a valid URL');
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration errors:\n${errors.join('\n')}`);
  }
  
  return true;
};

// Log de configuración en desarrollo
if (env.IS_DEVELOPMENT || env.IS_PRODUCTION) {
  console.log('🔧 Environment Configuration:', {
    API_URL: env.API_URL,
    APP_ENV: env.APP_ENV,
    ENDPOINTS: env.API_ENDPOINTS,
  });
}
