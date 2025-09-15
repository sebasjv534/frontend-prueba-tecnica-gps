/**
 * Utilidad para manejar las rutas de imágenes con basePath para GitHub Pages
 */

/**
 * Obtiene la ruta completa de una imagen
 * Next.js maneja automáticamente el basePath y assetPrefix configurados en next.config.ts
 * @param imagePath - La ruta de la imagen relativa a /public
 * @returns La ruta completa de la imagen
 */
export const getImagePath = (imagePath: string): string => {
  // Next.js maneja automáticamente assetPrefix, solo necesitamos la ruta desde /public
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

/**
 * Rutas de imágenes comunes - todas relativas a /public
 */
export const IMAGE_PATHS = {
  // Logos
  LOGO_MOTION: '/images/Imagologo_motion.svg',
  LOGO_TYPE_MOTION: '/images/Imagologotipo_motion.svg', 
  PHONE: '/images/Telefono-01.png',
  
  // Iconos de acciones
  ICON_CREAR: '/images/Icon_crear.svg',
  ICON_EDITAR: '/images/Icon_editar.svg',
  ICON_EDITAR1: '/images/Icon_editar1.svg',
  ICON_ELIMINAR: '/images/Icon_eliminar.svg',
  ICON_ELIMINAR1: '/images/Icon_eliminar1.svg',
  ICON_CANCELAR: '/images/Icon_cancelar.svg',
  ICON_CONFIRMAR: '/images/Icon_confirmar.svg',
  
  // Iconos de datos
  ICON_PERSONA: '/images/Icon_persona.svg',
  ICON_PERSONA1: '/images/Icon_persona1.svg',
  ICON_VEHICULO: '/images/Icon_vehiculo.svg',
  ICON_VEHICULO1: '/images/Icon_vehiculo1.svg',
  ICON_UBICACION: '/images/Icon_puntoubicacion.svg',
  ICON_UBICACION1: '/images/Icon_puntoubicacion1.svg',
} as const;