'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth, useVehicles, ProtectedRoute } from '@/hooks';
import { Vehicle } from '@/types';

/**
 * Componente para el navbar del dashboard
 */
function DashboardNavbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/home');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/Imagologotipo_motion.svg"
              alt="Logo Motion"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 font-semibold">
              Hola, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Página del dashboard principal - Diseño tabla como Figma
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const { vehicles, isLoading, loadVehicles, createVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [isTableEditMode, setIsTableEditMode] = useState(false);
  const [isTableDeleteMode, setIsTableDeleteMode] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isCreateHovered, setIsCreateHovered] = useState(false);
  
  // Estados para el formulario en la tarjeta lateral
  const [formData, setFormData] = useState({
    brand: '',
    arrival_location: '',
    applicant: '',
  });

  useEffect(() => {
    if (user) {
      loadVehicles();
    }
  }, [user, loadVehicles]);

  // Actualizar formulario cuando se selecciona un vehículo para editar
  useEffect(() => {
    if (editingVehicle) {
      setFormData({
        brand: editingVehicle.brand,
        arrival_location: editingVehicle.arrival_location,
        applicant: editingVehicle.applicant,
      });
    }
  }, [editingVehicle]);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.arrival_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.applicant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para mostrar notificaciones
  const showSuccessNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Función para validar formulario
  const validateForm = () => {
    // Validar que no haya campos vacíos o solo espacios en blanco
    const trimmedBrand = formData.brand.trim();
    const trimmedLocation = formData.arrival_location.trim();
    const trimmedApplicant = formData.applicant.trim();
    
    if (!trimmedBrand || !trimmedLocation || !trimmedApplicant) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      alert('Por favor, completa todos los campos. No se permiten campos vacíos.');
      return;
    }

    try {
      // Limpiar espacios en blanco de los datos antes de enviar
      const cleanFormData = {
        brand: formData.brand.trim(),
        arrival_location: formData.arrival_location.trim(),
        applicant: formData.applicant.trim()
      };

      if (editingVehicle && !isTableEditMode) {
        await updateVehicle(editingVehicle.id, cleanFormData);
        setEditingVehicle(undefined);
        showSuccessNotification('Vehículo actualizado correctamente');
      } else {
        await createVehicle(cleanFormData);
        setShowCreateForm(false);
        showSuccessNotification('Vehículo creado correctamente');
      }
      setFormData({ brand: '', arrival_location: '', applicant: '' });
      // Resetear estados de modo tabla en modo normal
      if (!isTableEditMode && !isTableDeleteMode) {
        setIsTableEditMode(false);
        setIsTableDeleteMode(false);
        setVehicleToDelete(null);
      }
      loadVehicles();
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleCancel = () => {
    setShowCancelAlert(true);
  };

  const handleConfirmCancel = () => {
    setEditingVehicle(undefined);
    setShowCreateForm(false);
    setFormData({ brand: '', arrival_location: '', applicant: '' });
    setShowCancelAlert(false);
    // Resetear estados de modo tabla
    setIsTableEditMode(false);
    setIsTableDeleteMode(false);
    setVehicleToDelete(null);
    
    // Resetear validaciones visuales
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input: any) => {
      input.style.borderColor = '#C5C5C5';
    });
  };

  const handleCancelAlert = () => {
    setShowCancelAlert(false);
  };

  const handleCreateClick = () => {
    setEditingVehicle(undefined);
    setShowCreateForm(true);
    setFormData({ brand: '', arrival_location: '', applicant: '' });
    // Resetear estados de modo tabla
    setIsTableEditMode(false);
    setIsTableDeleteMode(false);
    setVehicleToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;
    
    try {
      await deleteVehicle(vehicleToDelete.id);
      if (editingVehicle?.id === vehicleToDelete.id) {
        setEditingVehicle(undefined);
        setFormData({ brand: '', arrival_location: '', applicant: '' });
        setShowCreateForm(false);
      }
      setShowDeleteModal(false);
      setVehicleToDelete(null);
      showSuccessNotification('Vehículo eliminado correctamente');
      loadVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Error al eliminar el vehículo');
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowCreateForm(true);
    setIsTableEditMode(true);
    setIsTableDeleteMode(false);
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setEditingVehicle(vehicle);
    setShowCreateForm(true);
    setIsTableDeleteMode(true);
    setIsTableEditMode(false);
  };

  const handleTableCancel = () => {
    setEditingVehicle(undefined);
    setShowCreateForm(false);
    setFormData({ brand: '', arrival_location: '', applicant: '' });
    setIsTableEditMode(false);
    setIsTableDeleteMode(false);
    setVehicleToDelete(null);
  };

  const handleTableConfirm = async () => {
    if (isTableDeleteMode && vehicleToDelete) {
      // Confirmar eliminación directa
      try {
        await deleteVehicle(vehicleToDelete.id);
        showSuccessNotification('Vehículo eliminado correctamente');
        loadVehicles();
        handleTableCancel();
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert('Error al eliminar el vehículo');
      }
    } else if (isTableEditMode && editingVehicle) {
      // Confirmar edición directa
      if (!validateForm()) {
        alert('Por favor, completa todos los campos. No se permiten campos vacíos.');
        return;
      }
      
      try {
        const cleanFormData = {
          brand: formData.brand.trim(),
          arrival_location: formData.arrival_location.trim(),
          applicant: formData.applicant.trim()
        };
        
        await updateVehicle(editingVehicle.id, cleanFormData);
        showSuccessNotification('Vehículo actualizado correctamente');
        loadVehicles();
        handleTableCancel();
      } catch (error) {
        console.error('Error updating vehicle:', error);
        alert('Error al actualizar el vehículo');
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        
        <div className="w-full px-4 py-8">
          {/* Diseño principal inspirado en Figma */}
          <div className="flex flex-col xl:flex-row gap-8 max-w-none">
            
            {/* Panel lateral izquierdo - Formulario de vehículo según diseño Figma */}
            <div className="flex-shrink-0">
              <div className="relative bg-white rounded-[20px] w-full max-w-[640px] lg:w-[600px] md:w-[500px] sm:w-[400px]" style={{ 
                height: '300px',
                padding: '24px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)'
              }}>
                
                {/* Icono de crear en la parte superior izquierda - clickeable */}
                <motion.div 
                  className="absolute top-4 left-4 cursor-pointer"
                  onClick={handleCreateClick}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 10,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    rotate: -5,
                    transition: { duration: 0.1 }
                  }}
                  animate={{ 
                    rotate: showCreateForm ? 180 : 0,
                    scale: showCreateForm ? 1.1 : 1 
                  }}
                  transition={{ 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300 
                  }}
                  title="Agregar nuevo vehículo"
                  style={{
                    filter: 'drop-shadow(0 0 0px rgba(1, 190, 219, 0))',
                    transition: 'filter 0.3s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(1, 190, 219, 0.8)) drop-shadow(0 0 20px rgba(1, 190, 219, 0.6)) drop-shadow(0 0 30px rgba(1, 190, 219, 0.4))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(1, 190, 219, 0))';
                  }}
                >
                  <Image
                    src="/images/Icon_crear.svg"
                    alt="Crear"
                    width={34}
                    height={34}
                    className="w-[34px] h-[34px] drop-shadow-lg hover:drop-shadow-2xl transition-all duration-200 hover:brightness-110"
                  />
                </motion.div>

                
                
                {/* Formulario con campos según Figma - siempre visible */}
                <form onSubmit={handleSubmit} className="absolute top-[37px] left-[70px] lg:left-[80px] md:left-[60px] sm:left-[50px]">
                  <div className="space-y-[25px]">
                    {/* Campo Marca - Rectangle 20 con icono */}
                    <div className="relative flex items-center gap-3">
                      {/* Icono Vehículo */}
                      <motion.div 
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                        whileHover={{ 
                          scale: 1.2,
                          filter: 'drop-shadow(0 0 6px rgba(102, 102, 102, 0.6)) drop-shadow(0 0 12px rgba(102, 102, 102, 0.4))',
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          filter: 'drop-shadow(0 0 0px rgba(102, 102, 102, 0))',
                          transition: 'filter 0.3s ease-in-out'
                        }}
                      >
                        <img 
                          src="/images/Icon_vehiculo1.svg" 
                          alt="Vehículo"
                          className="w-8 h-8"
                        />
                      </motion.div>
                      {/* Input Container */}
                      <div 
                        className="border-[2px] border-[#C5C5C5] rounded-[20px] flex items-center justify-center w-full max-w-[400px] lg:w-[400px] md:w-[300px] sm:w-[240px]"
                        style={{ height: '45px' }}
                      >
                        <input
                          type="text"
                          placeholder="Mazda"
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          onBlur={(e) => {
                            if (e.target.value.trim() === '') {
                              e.target.style.borderColor = '#ef4444';
                            } else {
                              e.target.style.borderColor = '#C5C5C5';
                            }
                          }}
                          disabled={isTableDeleteMode}
                          className={`w-full h-full px-5 text-[#666666] font-medium bg-transparent outline-none placeholder-[#C5C5C5] text-center border-none ${
                            isTableDeleteMode ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          style={{ 
                            fontFamily: 'Montserrat',
                            fontSize: '1.5rem',
                            fontWeight: 500
                          }}
                          required={!!(showCreateForm || editingVehicle)}
                        />
                      </div>
                    </div>
                    
                    {/* Campo Sucursal - Rectangle 21 con icono */}
                    <div className="relative flex items-center gap-3">
                      {/* Icono Ubicación */}
                      <motion.div 
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                        whileHover={{ 
                          scale: 1.2,
                          filter: 'drop-shadow(0 0 6px rgba(102, 102, 102, 0.6)) drop-shadow(0 0 12px rgba(102, 102, 102, 0.4))',
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          filter: 'drop-shadow(0 0 0px rgba(102, 102, 102, 0))',
                          transition: 'filter 0.3s ease-in-out'
                        }}
                      >
                        <img 
                          src="/images/Icon_puntoubicacion1.svg" 
                          alt="Ubicación"
                          className="w-8 h-8"
                        />
                      </motion.div>
                      {/* Input Container */}
                      <div 
                        className="border-[2px] border-[#C5C5C5] rounded-[20px] flex items-center justify-center w-full max-w-[400px] lg:w-[400px] md:w-[300px] sm:w-[240px]"
                        style={{ height: '45px' }}
                      >
                        <input
                          type="text"
                          placeholder="Chapinero"
                          value={formData.arrival_location}
                          onChange={(e) => setFormData({ ...formData, arrival_location: e.target.value })}
                          onBlur={(e) => {
                            if (e.target.value.trim() === '') {
                              e.target.style.borderColor = '#ef4444';
                            } else {
                              e.target.style.borderColor = '#C5C5C5';
                            }
                          }}
                          disabled={isTableDeleteMode}
                          className={`w-full h-full px-5 text-[#666666] font-medium bg-transparent outline-none placeholder-[#C5C5C5] text-center border-none ${
                            isTableDeleteMode ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          style={{ 
                            fontFamily: 'Montserrat',
                            fontSize: '1.5rem',
                            fontWeight: 500
                          }}
                          required={!!(showCreateForm || editingVehicle)}
                        />
                      </div>
                    </div>
                    
                    {/* Campo Aspirante - Rectangle 22 con icono */}
                    <div className="relative flex items-center gap-3">
                      {/* Icono Persona */}
                      <motion.div 
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                        whileHover={{ 
                          scale: 1.2,
                          filter: 'drop-shadow(0 0 6px rgba(102, 102, 102, 0.6)) drop-shadow(0 0 12px rgba(102, 102, 102, 0.4))',
                          transition: { duration: 0.2 }
                        }}
                        style={{
                          filter: 'drop-shadow(0 0 0px rgba(102, 102, 102, 0))',
                          transition: 'filter 0.3s ease-in-out'
                        }}
                      >
                        <img 
                          src="/images/Icon_persona1.svg" 
                          alt="Persona"
                          className="w-8 h-8"
                        />
                      </motion.div>
                      {/* Input Container */}
                      <div 
                        className="border-[2px] border-[#C5C5C5] rounded-[20px] flex items-center justify-center w-full max-w-[400px] lg:w-[400px] md:w-[300px] sm:w-[240px]"
                        style={{ height: '45px' }}
                      >
                        <input
                          type="text"
                          placeholder="David Sandoval"
                          value={formData.applicant}
                          onChange={(e) => setFormData({ ...formData, applicant: e.target.value })}
                          onBlur={(e) => {
                            if (e.target.value.trim() === '') {
                              e.target.style.borderColor = '#ef4444';
                            } else {
                              e.target.style.borderColor = '#C5C5C5';
                            }
                          }}
                          disabled={isTableDeleteMode}
                          className={`w-full h-full px-5 text-[#666666] font-medium bg-transparent outline-none placeholder-[#C5C5C5] text-center border-none ${
                            isTableDeleteMode ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          style={{ 
                            fontFamily: 'Montserrat',
                            fontSize: '1.5rem',
                            fontWeight: 500
                          }}
                          required={!!(showCreateForm || editingVehicle)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Botones de acción - comportamiento diferente según el modo */}
                  {(showCreateForm || editingVehicle) && (
                    <motion.div 
                      className={
                        isTableEditMode || isTableDeleteMode 
                          ? "absolute top-[210px] left-[356px] lg:left-[436px] md:left-[316px] sm:left-[256px] flex gap-2" 
                          : "absolute top-[210px] left-[44px] flex gap-3 w-full max-w-[400px] lg:w-[400px] md:w-[300px] sm:w-[240px] lg:top-[210px] md:top-[205px] sm:top-[200px]"
                      }
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {/* Botones para modo tabla (solo iconos) */}
                      {(isTableEditMode || isTableDeleteMode) ? (
                        <>
                          {/* Icono Cancelar */}
                          <motion.button
                            type="button"
                            onClick={handleTableCancel}
                            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-red-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Cancelar operación"
                          >
                            <img 
                              src="/images/Icon_cancelar.svg" 
                              alt="Cancelar"
                              className="w-6 h-6"
                            />
                          </motion.button>
                          
                          {/* Icono Confirmar */}
                          <motion.button
                            type="button"
                            onClick={handleTableConfirm}
                            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-blue-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={isTableDeleteMode ? "Confirmar eliminación" : "Confirmar edición"}
                          >
                            <img 
                              src="/images/Icon_confirmar.svg" 
                              alt="Confirmar"
                              className="w-6 h-6"
                            />
                          </motion.button>
                        </>
                      ) : (
                        <>
                          {/* Botón Cancelar - modo normal */}
                          <motion.button
                            type="button"
                            onClick={handleCancel}
                            onMouseEnter={() => setIsCancelHovered(true)}
                            onMouseLeave={() => setIsCancelHovered(false)}
                            className="cursor-pointer flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 bg-transparent text-sm lg:text-sm md:text-sm sm:text-xs flex items-center justify-center gap-2"
                            style={{
                              border: '2px solid #C6007E',
                              color: '#C6007E',
                              fontFamily: 'Montserrat'
                            }}
                            whileHover={{ 
                              backgroundColor: '#C6007E',
                              color: 'white',
                              scale: 1.02
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <img 
                              src="/images/Icon_cancelar.svg" 
                              alt="Cancelar"
                              className="w-4 h-4 transition-all duration-200"
                              style={{
                                filter: isCancelHovered ? 'brightness(0) invert(1)' : 'none'
                              }}
                            />
                            Cancelar
                          </motion.button>
                          
                          {/* Botón Crear/Actualizar - modo normal */}
                          <motion.button
                            type="submit"
                            onMouseEnter={() => setIsCreateHovered(true)}
                            onMouseLeave={() => setIsCreateHovered(false)}
                            className="cursor-pointer flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-200 bg-transparent text-sm lg:text-sm md:text-sm sm:text-xs flex items-center justify-center gap-2"
                            style={{
                              border: '2px solid #01BEDB',
                              color: '#01BEDB',
                              fontFamily: 'Montserrat'
                            }}
                            whileHover={{ 
                              backgroundColor: '#01BEDB',
                              color: 'white',
                              scale: 1.02
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <img 
                              src="/images/Icon_confirmar.svg" 
                              alt="Confirmar"
                              className="w-4 h-4 transition-all duration-200"
                              style={{
                                filter: isCreateHovered ? 'brightness(0) invert(1)' : 'none'
                              }}
                            />
                            {editingVehicle && !isTableEditMode ? 'Actualizar' : 'Crear'}
                          </motion.button>
                        </>
                      )}
                    </motion.div>
                  )}
                </form>
              </div>
            </div>

            {/* Panel principal - Tabla de vehículos */}
            <div className="flex-1">
              <div className="overflow-hidden">
                
                {/* Headers de la tabla */}
                <div className="flex gap-2 px-2">
                  <div className="w-[25%] h-16 bg-[#E280BE] flex items-center justify-start pl-4">
                    <span className="text-white font-medium text-2xl" style={{ fontFamily: 'Montserrat' }}>
                      Marca
                    </span>
                  </div>
                  <div className="w-[30%] h-16 bg-[#E280BE] flex items-center justify-start pl-4">
                    <span className="text-white font-medium text-2xl" style={{ fontFamily: 'Montserrat' }}>
                      Sucursal
                    </span>
                  </div>
                  <div className="w-[45%] h-16 bg-[#E280BE] flex items-center justify-start pl-4">
                    <span className="text-white font-medium text-2xl" style={{ fontFamily: 'Montserrat' }}>
                      Aspirante
                    </span>
                  </div>
                </div>

                {/* Contenido de la tabla */}
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-4 border-primary-blue1 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : filteredVehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No hay vehículos registrados
                    </h3>
                    <p className="text-gray-700">
                      Comienza agregando tu primer vehículo
                    </p>
                  </div>
                ) : (
                  <div className="px-2">
                    {filteredVehicles.map((vehicle, index) => (
                      <div key={vehicle.id} className="flex items-center gap-2 py-2 hover:bg-gray-50 transition-colors border-b" style={{ borderBottomColor: '#E280BE' }}>
                        {/* Celda Marca */}
                        <div className="w-[25%] px-4 text-left">
                          <span className="text-[#666666] font-medium text-lg" style={{ fontFamily: 'Montserrat' }}>
                            {vehicle.brand}
                          </span>
                        </div>
                        
                        {/* Celda Sucursal */}
                        <div className="w-[30%] px-4 text-left">
                          <span className="text-[#666666] font-medium text-lg" style={{ fontFamily: 'Montserrat' }}>
                            {vehicle.arrival_location}
                          </span>
                        </div>
                        
                        {/* Celda Aspirante */}
                        <div className="w-[45%] px-4 text-left flex items-center justify-between">
                          <span className="text-[#666666] font-medium text-lg" style={{ fontFamily: 'Montserrat' }}>
                            {vehicle.applicant}
                          </span>
                          
                          {/* Iconos de acción */}
                          <div className="flex items-center space-x-2">
                            {/* Icono editar - rosa */}
                            <motion.div 
                              className="w-9 h-9 rounded cursor-pointer flex items-center justify-center hover:bg-[#9bacc9] transition-colors"
                              onClick={() => handleEditVehicle(vehicle)}
                              whileHover={{ 
                                scale: 1.15,
                                filter: 'drop-shadow(0 0 8px rgba(155, 172, 201, 0.7)) drop-shadow(0 0 16px rgba(155, 172, 201, 0.5))',
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                filter: 'drop-shadow(0 0 0px rgba(155, 172, 201, 0))',
                                transition: 'filter 0.3s ease-in-out'
                              }}
                            >
                              <Image
                                src="/images/Icon_editar1.svg"
                                alt="Editar"
                                width={38}
                                height={38}
                              />
                            </motion.div>
                            
                            {/* Icono eliminar - rosa */}
                            <motion.div 
                              className="w-9 h-9 rounded cursor-pointer flex items-center justify-center hover:bg-[#e4cfdc] transition-colors"
                              onClick={() => handleDeleteVehicle(vehicle)}
                              whileHover={{ 
                                scale: 1.15,
                                filter: 'drop-shadow(0 0 8px rgba(228, 207, 220, 0.7)) drop-shadow(0 0 16px rgba(228, 207, 220, 0.5))',
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                filter: 'drop-shadow(0 0 0px rgba(228, 207, 220, 0))',
                                transition: 'filter 0.3s ease-in-out'
                              }}
                            >
                              <Image
                                src="/images/Icon_eliminar1.svg"
                                alt="Eliminar"
                                width={38}
                                height={38}
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notificación de éxito */}
        {showNotification && (
          <motion.div 
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{notificationMessage}</span>
            </div>
          </motion.div>
        )}

        {/* Alert personalizado para cancelar */}
        {showCancelAlert && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-6 mx-4 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Cancelar operación?</h3>
                <p className="text-gray-600 mb-6">¿Estás seguro de que deseas cancelar? Se perderán todos los datos ingresados.</p>
                
                <div className="flex gap-3 justify-center">
                  <motion.button
                    onClick={handleCancelAlert}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    No, continuar
                  </motion.button>
                  <motion.button
                    onClick={handleConfirmCancel}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sí, cancelar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Logo inferior centrado - posicionado en la parte inferior */}
        <div className="w-full flex justify-center items-end min-h-[120px] pb-4">
          <div className="max-w-xs">
            <Image
              src="/images/Imagologotipo_motion.svg"
              alt="Logo Motion"
              width={200}
              height={80}
              className="w-auto h-12 opacity-40 hover:opacity-70 transition-opacity duration-300"
              priority={false}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}