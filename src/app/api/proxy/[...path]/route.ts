import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/config/env';

/**
 * Proxy para manejar peticiones a la API externa
 * Útil para evitar problemas de CORS en desarrollo
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'PATCH');
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    // Construir la URL de la API externa
    const apiPath = params.path.join('/');
    const url = new URL(`${env.API_URL}/${apiPath}`);
    
    // Copiar query parameters
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    // Preparar headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Copiar headers de autorización si existen
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      headers.Authorization = authHeader;
    }

    // Preparar el body para métodos que lo requieren
    let body: string | undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      try {
        const requestBody = await request.text();
        body = requestBody;
      } catch (error) {
        console.error('Error reading request body:', error);
      }
    }

    console.log(`🔄 Proxy ${method} request to:`, url.toString());

    // Hacer la petición a la API externa
    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
    });

    // Obtener el contenido de la respuesta
    const contentType = response.headers.get('content-type');
    let responseData;

    if (contentType?.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    console.log(`✅ Proxy response (${response.status}):`, responseData);

    // Crear la respuesta con los headers de CORS apropiados
    const nextResponse = NextResponse.json(responseData, {
      status: response.status,
      statusText: response.statusText,
    });

    // Añadir headers de CORS
    nextResponse.headers.set('Access-Control-Allow-Origin', '*');
    nextResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    nextResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return nextResponse;

  } catch (error: any) {
    console.error('❌ Proxy error:', error);

    return NextResponse.json(
      { 
        error: 'Proxy Error', 
        message: error.message || 'Error connecting to API',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}

// Manejar OPTIONS para CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}