/**
 * Utilidades para manejar rutas de imágenes en desarrollo y producción
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
 * Construye la ruta completa para una imagen
 * @param imagePath - Ruta relativa de la imagen (ej: '/images/logo.svg')
 * @returns Ruta completa con basePath incluido para producción
 */
export const getImagePath = (imagePath: string): string => {
  const basePath = getBasePath();
  
  // Asegurar que imagePath comience con /
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${basePath}${normalizedPath}`;
};

/**
 * Rutas de imágenes predefinidas con configuración automática
 * Usar estas constantes en lugar de rutas hardcodeadas
 */
export const IMAGE_PATHS = {
  // Logos
  LOGO_MOTION: getImagePath('/images/Imagologo_motion.svg'),
  LOGO_TYPE_MOTION: getImagePath('/images/Imagologotipo_motion.svg'),
  
  // Otros
  PHONE: getImagePath('/images/Telefono-01.png'),
  
  // Iconos
  ICON_CREAR: getImagePath('/images/Icon_crear.svg'),
  ICON_EDITAR: getImagePath('/images/Icon_editar.svg'),
  ICON_EDITAR1: getImagePath('/images/Icon_editar1.svg'),
  ICON_ELIMINAR: getImagePath('/images/Icon_eliminar.svg'),
  ICON_ELIMINAR1: getImagePath('/images/Icon_eliminar1.svg'),
  ICON_CANCELAR: getImagePath('/images/Icon_cancelar.svg'),
  ICON_CONFIRMAR: getImagePath('/images/Icon_confirmar.svg'),
  ICON_PERSONA: getImagePath('/images/Icon_persona.svg'),
  ICON_PERSONA1: getImagePath('/images/Icon_persona1.svg'),
  ICON_VEHICULO: getImagePath('/images/Icon_vehiculo.svg'),
  ICON_VEHICULO1: getImagePath('/images/Icon_vehiculo1.svg'),
  ICON_UBICACION: getImagePath('/images/Icon_puntoubicacion.svg'),
  ICON_UBICACION1: getImagePath('/images/Icon_puntoubicacion1.svg'),
} as const;

// Tipo para las claves de IMAGE_PATHS
export type ImagePathKey = keyof typeof IMAGE_PATHS;
