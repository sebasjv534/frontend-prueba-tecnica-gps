# 🚗 Sistema de Gestión de Vehículos Motion

## 📖 Descripción del Proyecto

Sistema de gestión de vehículos desarrollado con **Next.js 14**, **TypeScript** y **Tailwind CSS**. Implementa una arquitectura moderna con autenticación JWT, animaciones fluidas con Framer Motion y un diseño responsive que garantiza una experiencia de usuario excepcional.

La aplicación permite a los usuarios gestionar un inventario de vehículos de manera intuitiva, con operaciones CRUD completas y una interfaz que sigue los principios de diseño moderno y accesibilidad.

## ✨ Características Principales

### 🔐 **Autenticación Segura**
- Sistema de login/registro con validación en tiempo real
- Autenticación JWT con refresh tokens automático
- Protección de rutas con middleware personalizado
- Manejo seguro de sesiones con localStorage

### 🎨 **Interfaz de Usuario Avanzada**
- **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **Animaciones Fluidas**: Implementadas con Framer Motion para feedback visual
- **Accesibilidad**: Tooltips, estados de hover y indicadores visuales
- **Tema Corporativo**: Paleta de colores coherente con la identidad de Motion

### 🚗 **Gestión de Vehículos**
- **Crear**: Formulario intuitivo con validación en tiempo real
- **Leer**: Tabla organizada con información clara y búsqueda
- **Actualizar**: Edición directa desde la tabla con confirmación visual
- **Eliminar**: Proceso de eliminación con doble confirmación

### 🎯 **Experiencia de Usuario Optimizada**
- Notificaciones de éxito/error en tiempo real
- Estados de carga con spinners elegantes
- Validación de formularios con feedback inmediato
- Transiciones suaves entre estados

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Instalación
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd prueba-tecnica-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# Iniciar en modo desarrollo
npm run dev
```

## 🎮 Guía de Usuario - Flujo de la Aplicación

### 1️⃣ **Acceso al Sistema**

**Registro de Usuario Nuevo:**
1. Accede a la página principal
2. Haz clic en "Registrarse" 
3. Completa el formulario con:
   - Nombre de usuario único
   - Contraseña segura (mínimo 6 caracteres)
4. El sistema validará automáticamente la disponibilidad del usuario
5. Una vez registrado, serás redirigido al dashboard

**Inicio de Sesión:**
1. Desde la página principal, haz clic en "Iniciar Sesión"
2. Ingresa tus credenciales
3. El sistema verificará automáticamente y te dará acceso al dashboard

### 2️⃣ **Navegación del Dashboard**

**Interfaz Principal:**
- **Panel Izquierdo**: Formulario de gestión de vehículos
- **Panel Derecho**: Tabla con listado de vehículos existentes
- **Navegación Superior**: Información del usuario y opción de cerrar sesión

### 3️⃣ **Gestión de Vehículos**

**Crear Nuevo Vehículo:**
1. Haz clic en el ícono "+" (superior izquierdo del panel de formulario)
2. El formulario se activará con animación suave
3. Completa los campos obligatorios:
   - **Marca**: Modelo del vehículo (ej: "Toyota Corolla")
   - **Sucursal**: Ubicación de llegada (ej: "Chapinero")
   - **Aspirante**: Nombre del solicitante (ej: "Juan Pérez")
4. Haz clic en "Crear" para guardar
5. Verás una notificación de éxito y el vehículo aparecerá en la tabla

**Editar Vehículo Existente:**
1. En la tabla, identifica el vehículo a modificar
2. Haz clic en el ícono de edición (lápiz azul)
3. El formulario se poblará automáticamente con los datos actuales
4. Modifica los campos necesarios
5. Haz clic en "Confirmar" (ícono de verificación)
6. Los cambios se aplicarán inmediatamente

**Eliminar Vehículo:**
1. En la tabla, localiza el vehículo a eliminar
2. Haz clic en el ícono de eliminación (papelera rosa)
3. El formulario mostrará los datos del vehículo (solo lectura)
4. Haz clic en "Confirmar" (ícono de verificación) para eliminar
5. El vehículo se eliminará permanentemente

**Cancelar Operaciones:**
- En cualquier momento, puedes hacer clic en el ícono "X" para cancelar
- Se mostrará un diálogo de confirmación para evitar pérdida accidental de datos

### 4️⃣ **Características de Interacción**

**Elementos Interactivos:**
- **Iconos con Hover**: Todos los íconos responden al mouse con animaciones suaves
- **Tooltips Informativos**: Información contextual sobre la función de cada elemento
- **Estados Visuales**: Feedback inmediato para todas las acciones del usuario
- **Validación en Tiempo Real**: Los errores se muestran inmediatamente

**Navegación Responsiva:**
- La aplicación se adapta automáticamente a diferentes tamaños de pantalla
- En dispositivos móviles, los paneles se reorganizan verticalmente
- Todos los elementos mantienen su funcionalidad en cualquier dispositivo

## 🛠️ Arquitectura Técnica

### **Stack Tecnológico**
- **Frontend**: Next.js 14 con App Router
- **Lenguaje**: TypeScript para tipado estático
- **Estilos**: Tailwind CSS con componentes personalizados
- **Animaciones**: Framer Motion para UX avanzada
- **Estado**: React Hooks con Context API
- **HTTP**: Axios para comunicación con API

### **Decisiones de Arquitectura**

**1. Next.js App Router**
- **Justificación**: Mejor rendimiento con Server Components y optimización automática
- **Beneficio**: Carga más rápida y mejor SEO

**2. TypeScript**
- **Justificación**: Detecta errores en tiempo de desarrollo y mejora la mantenibilidad
- **Beneficio**: Código más robusto y documentación implícita

**3. Tailwind CSS**
- **Justificación**: Desarrollo más rápido con utilidades atómicas y tamaño optimizado
- **Beneficio**: CSS más pequeño y diseño consistente

**4. Framer Motion**
- **Justificación**: Animaciones performantes que mejoran la experiencia de usuario
- **Beneficio**: Feedback visual intuitivo y aplicación moderna

**5. Context API + Custom Hooks**
- **Justificación**: Gestión de estado simple y reutilizable sin dependencias externas
- **Beneficio**: Menor complejidad y mejor rendimiento

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── dashboard/         # Página principal de gestión
│   ├── login/            # Página de autenticación
│   ├── register/         # Página de registro
│   └── layout.tsx        # Layout global
├── components/           # Componentes reutilizables
├── context/             # Contexts de React
├── hooks/               # Custom hooks
├── services/            # Servicios de API
├── types/               # Definiciones de TypeScript
└── utils/               # Utilidades y helpers
```

## 🎯 Próximas Mejoras

- [ ] **Búsqueda Avanzada**: Filtros por múltiples criterios
- [ ] **Exportación de Datos**: Descargar listados en CSV/PDF
- [ ] **Gestión de Roles**: Diferentes niveles de acceso
- [ ] **Dashboard Analytics**: Métricas y reportes visuales
- [ ] **Notificaciones Push**: Alertas en tiempo real
- [ ] **Modo Oscuro**: Tema alternativo para mejor accesibilidad

## 👥 Contribución

Este proyecto sigue las mejores prácticas de desarrollo:
- Commits semánticos con [Conventional Commits](https://www.conventionalcommits.org/)
- Code review obligatorio para todas las funcionalidades
- Testing automatizado para componentes críticos
- Documentación actualizada con cada cambio

## 📄 Licencia

Proyecto desarrollado para demostración de habilidades técnicas.

---

**Desarrollado con ❤️ utilizando las mejores prácticas de desarrollo frontend moderno**
