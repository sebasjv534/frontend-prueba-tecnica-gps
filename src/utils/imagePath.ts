/**
 * Utilidad para manejar las rutas de imágenes con basePath para GitHub Pages
 */

/**
 * Obtiene la ruta completa de una imagen
 * Next.js maneja automáticamente el basePath configurado en next.config.ts
 * @param imagePath - La ruta de la imagen relativa a /public
 * @returns La ruta completa de la imagen
 */
export const getImagePath = (imagePath: string): string => {
  // Next.js maneja el basePath automáticamente, solo necesitamos la ruta
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

/**
 * Rutas de imágenes comunes
 */
export const IMAGE_PATHS = {
  // Logos
  LOGO_MOTION: getImagePath('images/Imagologo_motion.svg'),
  LOGO_TYPE_MOTION: getImagePath('images/Imagologotipo_motion.svg'),
  PHONE: getImagePath('images/Telefono-01.png'),
  
  // Iconos de acciones
  ICON_CREAR: getImagePath('images/Icon_crear.svg'),
  ICON_EDITAR: getImagePath('images/Icon_editar.svg'),
  ICON_EDITAR1: getImagePath('images/Icon_editar1.svg'),
  ICON_ELIMINAR: getImagePath('images/Icon_eliminar.svg'),
  ICON_ELIMINAR1: getImagePath('images/Icon_eliminar1.svg'),
  ICON_CANCELAR: getImagePath('images/Icon_cancelar.svg'),
  ICON_CONFIRMAR: getImagePath('images/Icon_confirmar.svg'),
  
  // Iconos de datos
  ICON_PERSONA: getImagePath('images/Icon_persona.svg'),
  ICON_PERSONA1: getImagePath('images/Icon_persona1.svg'),
  ICON_VEHICULO: getImagePath('images/Icon_vehiculo.svg'),
  ICON_VEHICULO1: getImagePath('images/Icon_vehiculo1.svg'),
  ICON_UBICACION: getImagePath('images/Icon_puntoubicacion.svg'),
  ICON_UBICACION1: getImagePath('images/Icon_puntoubicacion1.svg'),
} as const;