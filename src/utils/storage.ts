/**
 * Claves para localStorage
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const;

/**
 * Guarda un valor en localStorage de forma segura
 * @param key - Clave del valor
 * @param value - Valor a guardar
 */
export const setStorage = (key: string, value: unknown): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

/**
 * Obtiene un valor de localStorage de forma segura
 * @param key - Clave del valor
 * @returns Valor deserializado o null
 */
export const getStorage = <T>(key: string): T | null => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  } catch (error) {
    console.error('Error al leer de localStorage:', error);
    return null;
  }
};

/**
 * Elimina un valor de localStorage
 * @param key - Clave del valor
 */
export const removeStorage = (key: string): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error);
  }
};

/**
 * Limpia todo el localStorage
 */
export const clearStorage = (): void => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  } catch (error) {
    console.error('Error al limpiar localStorage:', error);
  }
};