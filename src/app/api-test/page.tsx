'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { testApiConnection, testMainEndpoints, testAuthentication, wakeUpRenderApi } from '@/utils/apiTest';
import { env } from '@/config/env';

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
  message?: string;
}

export default function ApiTestPage() {
  const [connectionResult, setConnectionResult] = useState<TestResult | null>(null);
  const [endpointsResult, setEndpointsResult] = useState<any[]>([]);
  const [authResult, setAuthResult] = useState<TestResult | null>(null);
  const [wakeUpResult, setWakeUpResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleWakeUp = async () => {
    setIsLoading(true);
    setWakeUpResult(null);
    
    const result = await wakeUpRenderApi();
    setWakeUpResult(result);
    setIsLoading(false);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    setConnectionResult(null);
    
    const result = await testApiConnection();
    setConnectionResult(result);
    setIsLoading(false);
  };

  const handleTestEndpoints = async () => {
    setIsLoading(true);
    setEndpointsResult([]);
    
    const results = await testMainEndpoints();
    setEndpointsResult(results);
    setIsLoading(false);
  };

  const handleTestAuth = async () => {
    if (!credentials.username || !credentials.password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }
    
    setIsLoading(true);
    setAuthResult(null);
    
    const result = await testAuthentication(credentials);
    setAuthResult(result);
    setIsLoading(false);
  };

  const handleTestAll = async () => {
    setIsLoading(true);
    
    // 1. Despertar API
    const wakeResult = await wakeUpRenderApi();
    setWakeUpResult(wakeResult);
    
    // 2. Esperar un poco
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. Probar conexión
    const connResult = await testApiConnection();
    setConnectionResult(connResult);
    
    // 4. Probar endpoints
    const endResult = await testMainEndpoints();
    setEndpointsResult(endResult);
    
    setIsLoading(false);
  };

  const renderTestResult = (result: TestResult | null, title: string) => {
    if (!result) return null;
    
    return (
      <div className={`p-4 rounded-lg ${
        result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">
            {result.success ? '✅' : '❌'}
          </span>
          <span className={`font-semibold ${
            result.success ? 'text-green-800' : 'text-red-800'
          }`}>
            {result.success ? `${title} Exitoso` : `Error en ${title}`}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          {result.message || result.error}
        </p>
        {result.data && (
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🧪 Prueba de Conexión API
          </h1>
          <p className="text-gray-700">
            Verifica la conexión con tu API desplegada en Render
          </p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 font-medium">URL de la API:</p>
            <p className="font-mono text-blue-600 font-semibold">{env.API_URL}</p>
            <div className="mt-2 text-xs text-gray-600">
              <p>🔗 Auth: {env.API_URL}/auth/</p>
              <p>🚗 Vehicles: {env.API_URL}/vehicles/</p>
            </div>
          </div>
        </motion.div>

        {/* Wake Up API */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🌅 Despertar API de Render
          </h2>
          <p className="text-gray-700 mb-4">
            Las APIs gratuitas de Render se duermen después de 15 minutos. Este paso puede tomar hasta 1 minuto.
          </p>
          
          <button
            onClick={handleWakeUp}
            disabled={isLoading}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 
                       disabled:opacity-50 transition-colors mb-4"
          >
            {isLoading ? '⏳ Despertando...' : '☀️ Despertar API'}
          </button>

          {renderTestResult(wakeUpResult, 'Despertar API')}
        </motion.div>

        {/* Test Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔌 Test de Conexión Básica
          </h2>
          
          <button
            onClick={handleTestConnection}
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 
                       disabled:opacity-50 transition-colors mb-4"
          >
            {isLoading ? '⏳ Probando...' : '🚀 Probar Conexión'}
          </button>

          {renderTestResult(connectionResult, 'Conexión')}
        </motion.div>

        {/* Test Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📡 Test de Endpoints
          </h2>
          
          <button
            onClick={handleTestEndpoints}
            disabled={isLoading}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 
                       disabled:opacity-50 transition-colors mb-4"
          >
            {isLoading ? '⏳ Probando...' : '🔍 Probar Endpoints'}
          </button>

          {endpointsResult.length > 0 && (
            <div className="space-y-3">
              {endpointsResult.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.success 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {result.success ? '✅' : '❌'} {result.name}
                    </span>
                    <span className="text-sm text-gray-700 font-mono">
                      {result.path}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {result.fullUrl}
                  </div>
                  {!result.success && (
                    <p className="text-sm text-red-600 mt-1">
                      {result.error} (Status: {result.status})
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Test Authentication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔐 Test de Autenticación
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Usuario"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-600"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-600"
            />
          </div>
          
          <button
            onClick={handleTestAuth}
            disabled={isLoading}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 
                       disabled:opacity-50 transition-colors mb-4"
          >
            {isLoading ? '⏳ Probando...' : '🔑 Probar Login'}
          </button>

          {renderTestResult(authResult, 'Login')}
        </motion.div>

        {/* Test All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🚀 Ejecutar Todas las Pruebas
          </h2>
          <p className="text-gray-700 mb-4">
            Ejecuta automáticamente: Despertar API → Conexión → Endpoints
          </p>
          
          <button
            onClick={handleTestAll}
            disabled={isLoading}
            className="bg-indigo-500 text-white px-8 py-4 rounded-lg hover:bg-indigo-600 
                       disabled:opacity-50 transition-colors text-lg font-semibold"
          >
            {isLoading ? '⏳ Ejecutando Todas las Pruebas...' : '🎯 Ejecutar Todas las Pruebas'}
          </button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Instrucciones de Uso
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Primero, ejecuta "Despertar API" para activar el servicio de Render</li>
            <li>Luego, prueba la conexión básica</li>
            <li>Verifica que los endpoints respondan correctamente</li>
            <li>Opcionalmente, prueba la autenticación si tienes credenciales</li>
            <li>O usa "Ejecutar Todas las Pruebas" para un test completo automático</li>
          </ol>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
