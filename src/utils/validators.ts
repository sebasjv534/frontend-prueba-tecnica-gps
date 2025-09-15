/**
 * Valida si un email tiene un formato válido
 * @param email - Email a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si una contraseña cumple con los requisitos mínimos
 * @param password - Contraseña a validar
 * @returns true si es válida, false en caso contrario
 */
export const isValidPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, al menos una letra y un número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Valida si un año es válido para un vehículo
 * @param year - Año a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidVehicleYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

/**
 * Valida si un precio es válido
 * @param price - Precio a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidPrice = (price: number): boolean => {
  return price > 0 && price <= 10000000000; // Máximo 10 mil millones
};

/**
 * Valida si una cadena no está vacía
 * @param str - Cadena a validar
 * @returns true si no está vacía, false en caso contrario
 */
export const isNotEmpty = (str: string): boolean => {
  return str.trim().length > 0;
};

/**
 * Valida un objeto vehículo completo
 * @param vehicle - Datos del vehículo a validar
 * @returns Objeto con errores de validación
 */
export const validateVehicle = (vehicle: {
  marca: string;
  modelo: string;
  año: number;
  color: string;
  precio: number;
  descripcion?: string;
}) => {
  const errors: Record<string, string> = {};

  if (!isNotEmpty(vehicle.marca)) {
    errors.marca = 'La marca es requerida';
  }

  if (!isNotEmpty(vehicle.modelo)) {
    errors.modelo = 'El modelo es requerido';
  }

  if (!isValidVehicleYear(vehicle.año)) {
    errors.año = 'El año debe estar entre 1900 y el año actual';
  }

  if (!isNotEmpty(vehicle.color)) {
    errors.color = 'El color es requerido';
  }

  if (!isValidPrice(vehicle.precio)) {
    errors.precio = 'El precio debe ser mayor a 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};