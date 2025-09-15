import { httpClient } from '@/services/httpClient';
import { env } from '@/config/env';

/**
 * Función para probar la conexión con la API
 */
export const testApiConnection = async () => {
  try {
    console.log('🔄 Probando conexión con la API...');
    console.log('📡 URL de la API:', env.API_URL);
    
    // Intentar hacer una petición simple - primero probar el endpoint base
    let response;
    try {
      response = await httpClient.get('/health');
    } catch (healthError) {
      // Si /health no existe, probar directamente el endpoint de auth para verificar conexión
      console.log('⚠️ /health no disponible, probando /auth...');
      response = await httpClient.get('/auth');
    }
    
    console.log('✅ Conexión exitosa con la API');
    console.log('📊 Respuesta:', response);
    
    return {
      success: true,
      data: response,
      message: 'Conexión exitosa con la API de Render'
    };
  } catch (error: any) {
    console.error('❌ Error al conectar con la API:', error);
    
    let errorMessage = 'Error desconocido';
    
    if (error.status === 0) {
      errorMessage = 'No se puede conectar con la API. Verifica que esté funcionando y que la URL sea correcta.';
    } else if (error.status === 404) {
      errorMessage = 'Endpoint no encontrado. La API está funcionando pero la estructura puede ser diferente.';
    } else if (error.status >= 500) {
      errorMessage = 'Error interno del servidor. La API de Render puede estar reiniciándose.';
    } else if (error.status === 405) {
      errorMessage = 'Método no permitido. El endpoint existe pero no acepta GET.';
    } else {
      errorMessage = error.message || 'Error de conexión';
    }
    
    return {
      success: false,
      error: errorMessage,
      status: error.status || 0,
      details: error
    };
  }
};

/**
 * Función para probar los endpoints principales
 */
export const testMainEndpoints = async () => {
  const endpoints = [
    { name: 'Auth Base', path: '/auth' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Health Check', path: '/health' },
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`🔄 Probando ${endpoint.name} (${endpoint.path})...`);
      
      const response = await httpClient.get(endpoint.path);
      
      results.push({
        name: endpoint.name,
        path: endpoint.path,
        fullUrl: `${env.API_URL}${endpoint.path}`,
        success: true,
        data: response
      });
      
      console.log(`✅ ${endpoint.name}: OK`);
    } catch (error: any) {
      results.push({
        name: endpoint.name,
        path: endpoint.path,
        fullUrl: `${env.API_URL}${endpoint.path}`,
        success: false,
        error: error.message,
        status: error.status
      });
      
      console.log(`❌ ${endpoint.name}: ${error.message} (Status: ${error.status})`);
    }
  }
  
  return results;
};

/**
 * Función para probar autenticación (si tienes credenciales de prueba)
 */
export const testAuthentication = async (credentials: { username: string; password: string }) => {
  try {
    console.log('🔄 Probando autenticación...');
    console.log('📡 Endpoint de login:', `${env.API_URL}/auth/login`);
    
    const response = await httpClient.post('/auth/login', credentials);
    
    console.log('✅ Autenticación exitosa');
    console.log('🔑 Respuesta del servidor:', response);
    
    return {
      success: true,
      data: response,
      message: 'Autenticación exitosa - Token recibido'
    };
  } catch (error: any) {
    console.error('❌ Error de autenticación:', error);
    
    let errorMessage = 'Error de autenticación';
    
    if (error.status === 401) {
      errorMessage = 'Credenciales incorrectas. Verifica usuario y contraseña.';
    } else if (error.status === 422) {
      errorMessage = 'Datos de entrada inválidos. Verifica el formato de usuario y contraseña.';
    } else if (error.status === 404) {
      errorMessage = 'El endpoint de login no existe. Verifica la estructura de la API.';
    } else if (error.status >= 500) {
      errorMessage = 'Error del servidor. La API puede estar experimentando problemas.';
    } else {
      errorMessage = error.message || 'Error de conexión durante la autenticación';
    }
    
    return {
      success: false,
      error: errorMessage,
      status: error.status || 0,
      details: error
    };
  }
};

/**
 * Función para verificar que la API de Render esté despierta
 */
export const wakeUpRenderApi = async () => {
  try {
    console.log('🔄 Despertando API de Render...');
    console.log('⏰ Esto puede tomar hasta 1 minuto si la API estaba dormida...');
    
    // Render puede tardar hasta 50 segundos en despertar el servicio
    const response = await httpClient.get('/auth', { 
      timeout: 60000 // 1 minuto de timeout para despertar
    });
    
    console.log('✅ API de Render está activa');
    return {
      success: true,
      data: response,
      message: 'API de Render está activa y respondiendo'
    };
  } catch (error: any) {
    console.error('❌ Error al despertar la API:', error);
    
    return {
      success: false,
      error: error.message || 'Error al despertar la API de Render',
      status: error.status || 0
    };
  }
};
