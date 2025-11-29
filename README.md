# 🎫 Sistema de Mesa de Ayuda y Soporte - SICFOR

**Módulo del Grupo J** - Sistema Integral de Gestión para Centro de Formación y Cursos

## 📋 Descripción

Módulo completamente independiente para la gestión de tickets de soporte técnico y mesa de ayuda. Permite a los usuarios crear, visualizar, responder y gestionar tickets de manera intuitiva y eficiente.

## ✨ Características Principales

### 🎯 Funcionalidades Implementadas

- ✅ **CRUD Completo de Tickets**
  - Crear tickets con asunto, descripción, categoría y prioridad
  - Ver detalle completo de cada ticket
  - Editar información del ticket (asunto, categoría, prioridad, descripción)
  - Eliminar tickets

- ✅ **Sistema de Respuestas**
  - Historial de conversaciones entre Usuario y Soporte
  - Responder como Usuario o como Agente de Soporte
  - Visualización diferenciada de respuestas (código de colores)
  - Fecha y hora de cada respuesta

- ✅ **Gestión de Estados**
  - **Abierto**: Ticket recién creado
  - **En Proceso**: Ticket con al menos una respuesta
  - **Cerrado**: Ticket resuelto y finalizado

- ✅ **Sistema de Prioridades**
  - Baja (verde)
  - Media (naranja)
  - Alta (rojo)
  - Urgente (rojo oscuro)

- ✅ **Categorías de Soporte**
  - Técnico
  - Administrativo
  - Académico
  - Software
  - Hardware

- ✅ **Filtros y Organización**
  - Mis Tickets Abiertos
  - Tickets Cerrados
  - Vista de tabla con información resumida

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: React 18.3
- **Bundler**: Vite 5.0
- **Routing**: React Router DOM 6.20
- **Estilos**: CSS3 con Variables CSS (CSS Custom Properties)
- **Gestión de Estado**: React Context API
- **Persistencia**: LocalStorage (datos mock)

## 📁 Estructura del Proyecto

```
sicfor-tickets-grupo-j/
├── public/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Layout.jsx          # Componente de layout (header/footer)
│   │       └── Layout.css
│   ├── context/
│   │   └── TicketContext.jsx       # Context API para gestión de estado
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx       # Página principal (listado)
│   │   │   └── Dashboard.css
│   │   ├── CrearTicket/
│   │   │   ├── CrearTicket.jsx     # Formulario de creación
│   │   │   └── CrearTicket.css
│   │   └── VerTicket/
│   │       ├── VerTicket.jsx       # Vista detallada del ticket
│   │       └── VerTicket.css
│   ├── App.jsx                     # Componente principal
│   ├── App.css
│   ├── main.jsx                    # Punto de entrada
│   └── index.css                   # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 16+ instalado
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd "Sistema Integral de Gestion SICFOR"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Comandos Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Previsualiza build de producción
```

## 📱 Pantallas del Sistema

### 1. Dashboard (Página Principal)

- **Ruta**: `/`
- **Descripción**: Listado de todos los tickets del usuario
- **Funcionalidades**:
  - Botón destacado para crear nuevo ticket
  - Filtros: Mis Tickets Abiertos / Cerrados
  - Tabla con ID, Asunto, Categoría, Prioridad, Fecha y Acciones
  - Botones de acción: Ver 👁️, Editar ✏️, Eliminar 🗑️
  - Click en fila para ver detalle completo

### 2. Crear Ticket

- **Ruta**: `/crear-ticket`
- **Descripción**: Formulario para crear un nuevo ticket
- **Campos**:
  - Usuario (foto y nombre, pre-cargado)
  - Asunto* (campo de texto)
  - Categoría (select dropdown)
  - Prioridad (select dropdown)
  - Descripción* (textarea)
- **Botones**: GUARDAR / CANCELAR

### 3. Ver Ticket

- **Ruta**: `/ticket/:id`
- **Descripción**: Vista detallada de un ticket específico
- **Secciones**:
  - **Header**: ID del ticket, estado, botón volver
  - **Información**: Prioridad, categoría, asunto, descripción completa
  - **Botones de acción**: Ver/Editar, Responder, Reabrir
  - **Historial de respuestas**: Todas las conversaciones con fecha/hora
  - **Añadir respuesta**: Campo de texto con botones para responder como Usuario o Soporte
  - **Cerrar ticket**: Botón para finalizar el ticket

## 💾 Modelo de Datos

### Estructura de un Ticket

```javascript
{
  id: '001',                          // ID único (string)
  asunto: 'Error al iniciar sesión',  // Título del problema
  descripcion: 'Descripción...',      // Detalle completo
  categoria: 'Técnico',               // Categoría del ticket
  prioridad: 'Alta',                  // Nivel de prioridad
  estado: 'Abierto',                  // Estado actual
  fechaCreacion: '2023-11-20T10:30',  // ISO date
  fechaCierre: null,                  // ISO date (opcional)
  usuarioId: 1,                       // ID del usuario creador
  respuestas: [                       // Array de respuestas
    {
      id: 1,
      autor: 'Soporte',
      mensaje: 'Texto de la respuesta',
      fecha: '2023-11-20T11:00',
      esAgente: true
    }
  ]
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Primary**: `#2563eb` (Azul)
- **Success**: `#10b981` (Verde)
- **Warning**: `#f59e0b` (Naranja)
- **Danger**: `#ef4444` (Rojo)
- **Text**: `#1f2937` (Gris oscuro)
- **Background**: `#f9fafb` (Gris claro)

### Componentes de UI

- Botones con gradientes y sombras
- Badges para estados y prioridades
- Cards con border-radius y sombras
- Tablas responsive con hover effects
- Formularios con validación visual

## 🔧 Funcionalidades Técnicas

### Context API

El sistema utiliza React Context para gestionar el estado global:

- `TicketContext`: Provee datos y funciones a toda la app
- `useTickets()`: Hook personalizado para acceder al contexto

### Funciones Disponibles

```javascript
const {
  tickets,                    // Array de todos los tickets
  currentUser,                // Usuario actual
  crearTicket,               // Crear nuevo ticket
  obtenerTicket,             // Obtener por ID
  actualizarTicket,          // Actualizar datos
  eliminarTicket,            // Eliminar ticket
  agregarRespuesta,          // Añadir respuesta
  cerrarTicket,              // Cerrar ticket
  obtenerTicketsPorEstado    // Filtrar por estado
} = useTickets()
```

### Persistencia

Los datos se guardan automáticamente en `localStorage` con la key `sicfor-tickets`, lo que permite que persistan entre recargas de página.

## 📊 Datos de Prueba

El sistema incluye 3 tickets de ejemplo:

1. **#001**: Error al iniciar sesión (Técnico, Alta, Abierto)
2. **#002**: Cambio de contraseña (Administrativo, Media, Cerrado)
3. **#003**: No carga perfil (Software, Alta, En proceso)

## 🎯 Objetivos Cumplidos

✅ Módulo completamente independiente (no requiere otros módulos)  
✅ CRUD completo funcional  
✅ Interfaz intuitiva basada en mockups  
✅ Sistema de respuestas bidireccional  
✅ Gestión de estados del ticket  
✅ Prioridades y categorías  
✅ Persistencia de datos  
✅ Diseño responsive  
✅ Código limpio y bien estructurado  

## 👥 Equipo

**Grupo J** - Mesa de Ayuda / Soporte (Tickets)  
Sistema Integral de Gestión SICFOR

## 📝 Notas para el Desarrollo

### Próximas Mejoras (Opcionales)

- [ ] Integración con backend real (API REST)
- [ ] Autenticación de usuarios
- [ ] Notificaciones en tiempo real
- [ ] Adjuntar archivos a tickets/respuestas
- [ ] Búsqueda y filtros avanzados
- [ ] Exportar tickets a PDF
- [ ] Dashboard con estadísticas
- [ ] Asignación de tickets a agentes específicos
- [ ] Sistema de etiquetas/tags
- [ ] Modo oscuro

### Integración con Otros Módulos (Futuro)

Aunque es independiente, podría integrarse con:
- **Módulo A** (Usuarios): Para autenticación real
- **Módulo B** (Estudiantes): Tickets específicos de estudiantes
- **Módulo C** (Instructores): Soporte para instructores
- **Módulo D** (Cursos): Tickets relacionados con cursos específicos

## 📄 Licencia

Proyecto académico - Universidad 2023

---

**¿Necesitas ayuda?** Crea un ticket en nuestro sistema 😄
