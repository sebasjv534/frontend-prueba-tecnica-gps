// Helper para manejar rutas con basePath en producción
export function getRoutePath(route: string): string {
  // GitHub Pages ya maneja el basePath automáticamente
  // Solo devolvemos la ruta tal como está
  return route;
}