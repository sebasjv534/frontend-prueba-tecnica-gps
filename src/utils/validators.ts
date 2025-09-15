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
 * Valida si un username es válido
 * @param username - Username a validar
 * @returns true si es válido, false en caso contrario
 */
export const isValidUsername = (username: string): boolean => {
  // Entre 3 y 50 caracteres, solo letras, números y guiones bajos
  const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
  return usernameRegex.test(username);
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
 * Valida si una cadena no está vacía y tiene longitud válida
 * @param str - Cadena a validar
 * @param maxLength - Longitud máxima permitida (por defecto 120)
 * @returns true si es válida, false en caso contrario
 */
export const isValidString = (str: string, maxLength: number = 120): boolean => {
  return str.trim().length > 0 && str.trim().length <= maxLength;
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
  brand: string;
  arrival_location: string;
  applicant: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isValidString(vehicle.brand)) {
    errors.brand = 'La marca es requerida y debe tener máximo 120 caracteres';
  }

  if (!isValidString(vehicle.arrival_location)) {
    errors.arrival_location = 'La sucursal es requerida y debe tener máximo 120 caracteres';
  }

  if (!isValidString(vehicle.applicant)) {
    errors.applicant = 'El aspirante es requerido y debe tener máximo 120 caracteres';
  }

  return errors;
};

/**
 * Valida un objeto vehículo completo (versión completa con isValid)
 * @param vehicle - Datos del vehículo a validar
 * @returns Objeto con isValid y errores
 */
export const validateVehicleComplete = (vehicle: {
  brand: string;
  arrival_location: string;
  applicant: string;
}) => {
  const errors = validateVehicle(vehicle);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valida datos de registro de usuario
 * @param userData - Datos del usuario a validar
 * @returns Objeto con errores de validación
 */
export const validateRegisterData = (userData: {
  username: string;
  email: string;
  password: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isValidUsername(userData.username)) {
    errors.username = 'El username debe tener entre 3 y 50 caracteres, solo letras, números y guiones bajos';
  }

  if (!isValidEmail(userData.email)) {
    errors.email = 'El email no tiene un formato válido';
  }

  if (!isValidPassword(userData.password)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres, una letra y un número';
  }

  return errors;
};

/**
 * Valida datos de registro de usuario (versión completa con isValid)
 * @param userData - Datos del usuario a validar
 * @returns Objeto con isValid y errores
 */
export const validateRegisterDataComplete = (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const errors = validateRegisterData(userData);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valida datos de login
 * @param loginData - Datos de login a validar
 * @returns Objeto con errores de validación
 */
export const validateLoginData = (loginData: {
  username: string;
  password: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isNotEmpty(loginData.username)) {
    errors.username = 'El username es requerido';
  }

  if (!isNotEmpty(loginData.password)) {
    errors.password = 'La contraseña es requerida';
  }

  return errors;
};

/**
 * Valida datos de login (versión completa con isValid)
 * @param loginData - Datos de login a validar
 * @returns Objeto con isValid y errores
 */
export const validateLoginDataComplete = (loginData: {
  username: string;
  password: string;
}) => {
  const errors = validateLoginData(loginData);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};