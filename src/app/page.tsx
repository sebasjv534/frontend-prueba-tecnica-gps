'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getRoutePath, IMAGE_PATHS } from '@/utils';

/**
 * Componente para la animación lateral de círculos - Responsive
 */
function LateralAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Círculo animado principal */}
      <motion.div
        style={{
          boxShadow: '0px 0px 55px 20px rgba(0, 0, 0, 0.25)',
        }}
        animate={{
          scaleX: [1, 1.4, 2],
          scaleY: [1, 1.3, 1.8],
          x: ['100vw', '-50vw']
        }}
        transition={{
          duration: 10,
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
 * Página principal con diseño exacto de Figma - Responsive
 */
export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Animación lateral de círculos */}
      <LateralAnimation />

      {/* Logo vector en la esquina superior izquierda */}
      <div
        className="absolute z-10
                   w-[56px] h-[55px]
                   left-4 top-4
                   sm:left-6 sm:top-6
                   md:left-8 md:top-8
                   lg:left-[58px] lg:top-[43px]"
      >
        <div className="relative w-full h-full rounded">
          {/* SVG dentro ajustado sin deformar */}
          <Image
            src={IMAGE_PATHS.LOGO_MOTION}
            alt="Logo Motion"
            fill
            className="object-contain p-1"
            priority
          />
        </div>
      </div>

      {/* Contenido principal centrado */}
      <div
        className="relative z-10 flex flex-col 
      items-center justify-center min-h-screen px-4 sm:px-6 md:px-8"
      >
        {/* Título "BIENVENIDO A" */}
                {/* Título "BIENVENIDO A" */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-montserrat font-bold text-[#00249C] text-center mb-4
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[80px]
                     leading-tight lg:leading-[100px]
                     max-w-[90vw] lg:max-w-[800px]"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
          }}
        >
          BIENVENIDO A
        </motion.h1>

        {/* Título "MONITORING INNOVATION" */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="z-40 font-montserrat font-bold text-[#00249C] text-center
                     text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[55px]
                     lg:max-w-[900px]"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
          }}
        >
          MONITORING INNOVATION
        </motion.h2>

        {/* Imagen del teléfono */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute
                     w-[40vw] h-[48vh]
                     sm:w-[45vw] sm:h-[54vh]
                     md:w-[50vw] md:h-[60vh]
                     lg:w-[55vw] lg:h-[66vh]
                     xl:w-[65vw] xl:h-[68vh]
                     left-1/2 top-[15vh]
                     transform -translate-x-1/2" 
          style={{
            aspectRatio: '667/807'
          }}
        >
          <Image
            src={IMAGE_PATHS.PHONE}
            alt="Aplicación móvil Motion"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Enlaces del footer */}
            {/* Enlaces del footer */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-center items-center 
                        gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 
                        px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12
                        max-w-full lg:max-w-[90vw] xl:max-w-[80vw] mx-auto">
          <motion.a
            href="https://monitoringinnovation.com/"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="font-montserrat font-medium text-[#01BEDB] text-center
                       text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                       hover:text-[#00249C] transition-colors cursor-pointer
                       px-2 sm:px-3 md:px-4 py-2
                       border-b border-transparent hover:border-[#00249C]
                       min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            MONITORING INNOVATION
          </motion.a>

          <motion.a
            href="https://gpscontrol.co/"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="font-montserrat font-medium text-[#01BEDB] text-center
                       text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                       hover:text-[#00249C] transition-colors cursor-pointer
                       px-2 sm:px-3 md:px-4 py-2
                       border-b border-transparent hover:border-[#00249C]
                       min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            GPS CONTROL
          </motion.a>

          <motion.a
            href="https://github.com/sebasjv534/frontend-prueba-tecnica-gps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="font-montserrat font-medium text-[#01BEDB] text-center
                       text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                       hover:text-[#00249C] transition-colors cursor-pointer
                       px-2 sm:px-3 md:px-4 py-2
                       border-b border-transparent hover:border-[#00249C]
                       min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Link repo front
          </motion.a>

          <motion.a
            href="https://github.com/sebasjv534/backend-prueba-tecnica-gps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="font-montserrat font-medium text-[#01BEDB] text-center
                       text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                       hover:text-[#00249C] transition-colors cursor-pointer
                       px-2 sm:px-3 md:px-4 py-2
                       border-b border-transparent hover:border-[#00249C]
                       min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Link repo back
          </motion.a>
        </div>
      </div>

      {/* Botones de navegación flotantes para móvil */}
      <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-3 lg:hidden">
        <motion.a
          href={getRoutePath("/login")}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#00249C] to-[#40CEE4] text-white px-6 py-3 rounded-full shadow-lg
                     text-sm font-semibold hover:shadow-xl transition-all cursor-pointer
                     hover:from-[#40CEE4] hover:to-[#00249C]"
        >
          Iniciar Sesión
        </motion.a>

        <motion.a
          href={getRoutePath("/register")}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#C6007E] to-[#E280BE] text-white px-6 py-3 rounded-full shadow-lg
                     text-sm font-semibold hover:shadow-xl transition-all cursor-pointer
                     hover:from-[#E280BE] hover:to-[#C6007E]"
        >
          Registrarse
        </motion.a>
      </div>

      {/* Botones de navegación para desktop */}
      <div className="hidden lg:block absolute top-8 right-8 z-20">
        <div className="flex gap-4">
          <motion.a
            href={getRoutePath("/login")}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#00249C] to-[#40CEE4] text-white px-8 py-3 rounded-lg shadow-lg
                       font-semibold hover:shadow-xl transition-all cursor-pointer
                       hover:from-[#40CEE4] hover:to-[#00249C]"
          >
            Iniciar Sesión
          </motion.a>

          <motion.a
            href={getRoutePath("/register")}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#C6007E] to-[#E280BE] text-white px-8 py-3 rounded-lg shadow-lg
                       font-semibold hover:shadow-xl transition-all cursor-pointer
                       hover:from-[#E280BE] hover:to-[#C6007E]"
          >
            Registrarse
          </motion.a>
        </div>
      </div>
    </div>
  );
}
