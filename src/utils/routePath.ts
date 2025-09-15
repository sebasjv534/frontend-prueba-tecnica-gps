/**
 * Utilidades para manejar rutas de navegación en desarrollo y producción
 * Next.js maneja automáticamente el basePath para navegación interna
 */

/**
 * Construye la ruta para navegación interna (Next.js maneja el basePath automáticamente)
 * @param routePath - Ruta relativa (ej: '/dashboard', '/login')
 * @returns Ruta normalizada para navegación interna
 */
export const getRoutePath = (routePath: string): string => {
  // Para navegación interna, Next.js maneja el basePath automáticamente
  // Solo necesitamos asegurar que la ruta comience con /
  const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
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
