// Helper para manejar rutas con basePath en producción
export function getRoutePath(route: string): string {
  // En producción, agregamos el basePath
  if (process.env.NODE_ENV === 'production') {
    return `/frontend-prueba-tecnica-gps${route}`;
  }
  // En desarrollo, usamos la ruta normal
  return route;
}