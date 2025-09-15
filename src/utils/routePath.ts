/**
 * Utilidades para manejar rutas de navegación en desarrollo y producción
 * Soluciona el problema de GitHub Pages con rutas base
 */

/**
 * Obtiene la ruta base configurada para el proyecto
 * En producción usa el basePath de next.config.ts, en desarrollo usa ''
 */
const getBasePath = (): string => {
  // En producción (GitHub Pages), necesitamos el basePath
  if (process.env.NODE_ENV === 'production') {
    return '/frontend-prueba-tecnica-gps';
  }
  // En desarrollo, no necesitamos basePath
  return '';
};

/**
 * Construye la ruta completa para navegación
 * @param routePath - Ruta relativa (ej: '/dashboard', '/login')
 * @returns Ruta completa con basePath incluido para producción
 */
export const getRoutePath = (routePath: string): string => {
  const basePath = getBasePath();
  
  // Asegurar que routePath comience con /
  const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
  
  return `${basePath}${normalizedPath}`;
};

/**
 * Rutas de navegación predefinidas
 * Usar estas constantes en lugar de rutas hardcodeadas
 */
export const ROUTE_PATHS = {
  HOME: getRoutePath('/'),
  LOGIN: getRoutePath('/login'),
  REGISTER: getRoutePath('/register'),
  DASHBOARD: getRoutePath('/dashboard'),
} as const;

// Tipo para las claves de ROUTE_PATHS
export type RoutePathKey = keyof typeof ROUTE_PATHS;
