/**
 * Utilidades para manejar rutas de navegación en desarrollo y producción
 * Next.js maneja automáticamente el basePath para navegación interna
 */

/**
 * Construye la ruta para navegación interna considerando el basePath en producción
 * @param routePath - Ruta relativa (ej: '/dashboard', '/login')
 * @returns Ruta completa con basePath para GitHub Pages en producción
 */
export const getRoutePath = (routePath: string): string => {
  // Normalizar la ruta
  const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
  
  // En producción (GitHub Pages), agregar el basePath
  if (typeof window !== 'undefined' && window.location.hostname === 'sebasjv534.github.io') {
    const basePath = '/frontend-prueba-tecnica-gps';
    // Si es la ruta raíz, devolver solo el basePath
    if (normalizedPath === '/') {
      return basePath;
    }
    return `${basePath}${normalizedPath}`;
  }
  
  // En desarrollo, devolver la ruta normalizada
  return normalizedPath;
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
