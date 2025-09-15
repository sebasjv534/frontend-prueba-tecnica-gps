// Helper para manejar rutas con basePath en producción
export function getRoutePath(route: string): string {
  // En GitHub Pages, Next.js maneja automáticamente el basePath
  // configurado en next.config.ts, NO debemos agregarlo manualmente
  return route;
}