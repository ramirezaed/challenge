# challenge

Descripción
Aplicación de lista de tareas desarrollada para el challenge de ingreso a Academia ForIT, implementando tecnologías modernas:

Backend: Node.js + Express con SQLite3 como base de datos

Frontend: Next.js con Tailwind CSS para los estilos

Funcionalidad: CRUD completo de tareas con endpoints adicionales

Tecnologías Clave
 Backend: Node.js, Express, SQLite3

Frontend: Next.js, Tailwind CSS

Base de datos: SQLite con Prisma ORM

Endpoints Implementados
CRUD Básico
GET /api/tasks - Obtener todas las tareas

POST /api/tasks - Crear nueva tarea

PUT /api/tasks/:id - Actualizar tarea

DELETE /api/tasks/:id - Eliminar tarea

Endpoints Adicionales
GET /api/tasks/buscarPorId/:id - Buscar tarea por ID

GET /api/tasks/tareasPendientes - Filtrar tareas pendientes

GET /api/tasks/tareasCompletadas - Filtrar tareas completadas

PUT /api/tasks/finalizarTarea/:id - Marcar tarea como completada

PUT /api/tasks/resetearTarea/:id - Volver tarea a pendiente

Características
Persistencia de datos con SQLite

Interfaz responsive con Tailwind CSS

Aplicación fullstack con Next.js

Validaciones en frontend y backend

Filtrado por estado de tareas