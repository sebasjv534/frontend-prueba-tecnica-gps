'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useForm } from '@/hooks';
import { RegisterData } from '@/types';
import { validateRegisterData, getRoutePath, IMAGE_PATHS } from '@/utils';

/**
 * Componente para la animación lateral de círculos - Responsive
 */
function LateralAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Semicírculo animado principal */}
      <motion.div
        style={{
          boxShadow: '0px 0px 65.4681px 23.8066px rgba(0, 0, 0, 0.25)',
        }}
        animate={{
          x: ['150vw', '-50vw'],
          scaleX: [0.8, 1.5, 0.8],
          scaleY: [1, 1.8, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bg-white rounded-full
                   w-[80vw] h-[80vw] 
                   sm:w-[70vw] sm:h-[70vw] 
                   md:w-[60vw] md:h-[60vw] 
                   lg:w-[1112px] lg:h-[1112px] 
                   -right-[40vw] sm:-right-[35vw] md:-right-[30vw] lg:-right-[556px]
                   top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
}

/**
 * Página de registro de usuario
 */
export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    hasError,
    getError,
  } = useForm<RegisterData>(
    { username: '', email: '', password: '' },
    validateRegisterData
  );

  const onSubmit = async (data: RegisterData) => {
    try {
      await register(data);
      router.push(getRoutePath('/dashboard'));
    } catch (error) {
      console.error('Error en registro:', error);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Animación lateral de círculos */}
      <LateralAnimation />

      {/* Logo en la esquina superior izquierda */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute z-20 top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8"
      >
        <Link href={getRoutePath("/")} className="inline-block">
          <Image
            src={IMAGE_PATHS.LOGO_MOTION}
            alt="Logo Motion"
            width={56}
            height={55}
            className="object-contain"
            priority
          />
        </Link>
      </motion.div>

      {/* Contenedor principal centrado */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-8">
        <div className="w-full max-w-md lg:max-w-lg">
          {/* Títulos */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-montserrat font-bold text-[#00249C] text-center mb-2
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
              }}
            >
              CREAR CUENTA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-montserrat text-[#00249C] text-center
                         text-sm sm:text-base md:text-lg"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Únete a la familia Motion
            </motion.p>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20"
          >
            <form onSubmit={(e) => handleSubmit(onSubmit, e)} className="space-y-5">
              {/* Error general */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Campo Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-[#00249C] mb-2 font-montserrat">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image
                      src={IMAGE_PATHS.ICON_PERSONA}
                      alt="Usuario"
                      width={20}
                      height={20}
                      className="text-gray-600"
                    />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00249C] focus:border-transparent transition-all duration-200 font-montserrat text-gray-900 placeholder-gray-500 ${
                      hasError('username') ? 'border-red-400 bg-red-50' : 'border-gray-400 bg-white'
                    }`}
                    placeholder="Elige tu nombre de usuario"
                  />
                </div>
                {hasError('username') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-700 font-montserrat font-medium"
                  >
                    {getError('username')}
                  </motion.p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#00249C] mb-2 font-montserrat">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00249C] focus:border-transparent transition-all duration-200 font-montserrat text-gray-900 placeholder-gray-500 ${
                      hasError('email') ? 'border-red-400 bg-red-50' : 'border-gray-400 bg-white'
                    }`}
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                {hasError('email') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-700 font-montserrat font-medium"
                  >
                    {getError('email')}
                  </motion.p>
                )}
              </div>

              {/* Campo Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#00249C] mb-2 font-montserrat">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#00249C] focus:border-transparent transition-all duration-200 font-montserrat text-gray-900 placeholder-gray-500 ${
                      hasError('password') ? 'border-red-400 bg-red-50' : 'border-gray-400 bg-white'
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 hover:text-[#00249C] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464a1.5 1.5 0 00-2.122 0L3.5 11.314M9.878 9.878a3 3 0 104.243 4.243m0 0L16.5 12.69a3 3 0 100-4.243m-4.243 4.243l4.243 4.243M8.464 15.536a1.5 1.5 0 002.122 0L12 14.122m4.243-4.243a3 3 0 100 4.243m0 0l-4.243-4.243"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
                {hasError('password') && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-700 font-montserrat font-medium"
                  >
                    {getError('password')}
                  </motion.p>
                )}
                <p className="mt-1 text-xs text-[#00249C] font-montserrat font-medium">
                  Debe contener al menos 8 caracteres, una letra y un número
                </p>
              </div>

              {/* Botón de registro */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#C6007E] to-[#E280BE] text-white font-semibold py-3 px-4 rounded-lg 
                           hover:from-[#E280BE] hover:to-[#C6007E] focus:ring-2 focus:ring-[#C6007E] focus:ring-offset-2 
                           transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-montserrat
                           shadow-lg hover:shadow-xl cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creando cuenta...
                  </div>
                ) : (
                  'Crear Cuenta'
                )}
              </motion.button>

              {/* Divider */}
              <div className="text-center">
                <span className="text-[#00249C] text-sm font-montserrat font-medium">¿Ya tienes cuenta?</span>
              </div>

              {/* Link a login */}
              <Link href={getRoutePath("/login")}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-[#C6007E] text-[#C6007E] font-semibold py-3 px-4 rounded-lg 
                             hover:bg-[#C6007E] hover:text-white transition-all duration-200 font-montserrat
                             shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Iniciar Sesión
                </motion.button>
              </Link>
            </form>

            {/* Link de regreso */}
            <div className="mt-6 text-center">
              <Link href={getRoutePath("/")} className="text-sm text-[#00249C] hover:text-[#C6007E] transition-colors font-montserrat cursor-pointer font-medium">
                ← Volver al inicio
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}