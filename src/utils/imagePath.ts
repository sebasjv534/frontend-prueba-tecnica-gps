// Helper para manejar rutas de imágenes con basePath en producción
export function getImagePath(imagePath: string): string {
  // En producción, agregamos el basePath
  if (process.env.NODE_ENV === 'production') {
    return `/frontend-prueba-tecnica-gps${imagePath}`;
  }
  // En desarrollo, usamos la ruta normal
  return imagePath;
}