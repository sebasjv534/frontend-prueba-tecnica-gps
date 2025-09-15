'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

/**
 * Tipo genérico para valores de formulario
 */
type FormValues = Record<string, string | number | boolean>;

/**
 * Tipo para errores de validación
 */
type FormErrors = Record<string, string>;

/**
 * Tipo para función de validación
 */
type ValidationFunction<T> = (values: T) => FormErrors;

/**
 * Hook para manejar formularios de forma reutilizable
 */
export function useForm<T extends FormValues>(
  initialValues: T,
  validate?: ValidationFunction<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /**
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Maneja cuando un campo pierde el foco
   */
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validar el campo específico
    if (validate) {
      const fieldErrors = validate(values);
      if (fieldErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldErrors[name],
        }));
      }
    }
  };

  /**
   * Valida todo el formulario
   */
  const validateForm = (): boolean => {
    if (!validate) return true;

    const formErrors = validate(values);
    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (
    onSubmit: (values: T) => Promise<void> | void,
    e?: FormEvent<HTMLFormElement>
  ) => {
    if (e) {
      e.preventDefault();
    }

    // Marcar todos los campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Resetea el formulario a los valores iniciales
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  /**
   * Establece un valor específico
   */
  const setValue = (name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Establece un error específico
   */
  const setError = (name: string, error: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * Limpia errores
   */
  const clearErrors = () => {
    setErrors({});
  };

  /**
   * Verifica si un campo tiene error y ha sido tocado
   */
  const hasError = (name: string): boolean => {
    return !!(errors[name] && touched[name]);
  };

  /**
   * Obtiene el mensaje de error de un campo
   */
  const getError = (name: string): string => {
    return hasError(name) ? errors[name] : '';
  };

  /**
   * Verifica si el formulario es válido
   */
  const isValid = Object.keys(errors).length === 0;

  return {
    // Estado
    values,
    errors,
    touched,
    isSubmitting,
    isValid,

    // Handlers
    handleChange,
    handleBlur,
    handleSubmit,

    // Acciones
    resetForm,
    setValue,
    setError,
    clearErrors,
    validateForm,

    // Utilidades
    hasError,
    getError,
  };
}