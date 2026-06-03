# CarpinPro — Frontend

Frontend del sistema **CarpinPro**, una plataforma web diseñada para conectar clientes con carpinteros de Cochabamba, Bolivia. Desarrollada como Proyecto de Grado.

---

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Directorios](#estructura-de-directorios)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Funcionalidades Principales](#funcionalidades-principales)
- [Configuración y Variables de Entorno](#configuración-y-variables-de-entorno)
- [Levantar el Proyecto en Local](#levantar-el-proyecto-en-local)
- [Scripts Disponibles](#scripts-disponibles)
- [Tests](#tests)
- [Conexión con el Backend](#conexión-con-el-backend)

---

## Descripción del Proyecto

CarpinPro es una plataforma digital que da visibilidad a los pequeños y medianos carpinteros. Los clientes pueden:

- Explorar perfiles completos de carpinteros con galería de imágenes.
- Consultar y escribir reseñas con calificaciones.
- Ver los productos en venta de cada carpintero.
- Generar y gestionar contratos digitales en formato PDF.
- Contactar al carpintero directamente por WhatsApp o llamada.
- Visualizar la ubicación del taller en un mapa interactivo.

Los carpinteros pueden registrarse en la plataforma, gestionar su perfil, imágenes, productos y contratos. Existe además un panel de administración para gestionar todos los recursos del sistema.

---

## Stack Tecnológico

| Categoría            | Tecnología                                      |
|---------------------|-------------------------------------------------|
| Framework UI        | React 18 + TypeScript 5.6                       |
| Bundler / Dev Server | Vite 7 (`@vitejs/plugin-react-swc`)            |
| Componentes UI      | MUI v6 (`@mui/material`, `@mui/icons-material`) |
| Estilos             | TailwindCSS 3 + PostCSS                         |
| Routing             | React Router DOM v6                             |
| Peticiones HTTP     | Axios 1.7 (con interceptores)                   |
| Formularios         | Formik 2 + Yup 1                                |
| Mapas               | Leaflet 1.9 + React Leaflet 4                   |
| PDF                 | @react-pdf/renderer 4                           |
| Notificaciones      | SweetAlert2 11                                  |
| Testing             | Vitest 4 + @testing-library/react 16 + jsdom   |
| Mocking HTTP        | axios-mock-adapter                              |
| Linting             | ESLint 9 + typescript-eslint                    |

---

## Arquitectura del Proyecto

La aplicación es un **SPA (Single Page Application)** construida con React y TypeScript, consumiendo una API REST provista por un backend Laravel.

### Capas principales

```
React App (SPA)
│
├── Capa de Presentación   → Pages + Components
├── Capa de Estado Global  → React Context (AuthContext)
├── Capa de Lógica         → Custom Hooks
└── Capa de Acceso a Datos → Services (Axios)
                               └── axiosInstance (interceptores JWT)
```

### Gestión de Estado

Se utiliza **React Context** (`AuthContext`) como única fuente de verdad para la sesión del usuario. No se usa ninguna librería de estado global adicional (sin Redux, sin Zustand). El estado local de cada componente se gestiona con `useState` y `useMemo`.

### Autenticación

El flujo de autenticación funciona así:

1. Al hacer login/registro, el backend devuelve un **JWT Bearer Token**.
2. El token se almacena en `localStorage`.
3. El `axiosInstance` adjunta el token automáticamente en cada request mediante un **interceptor de request**.
4. El interceptor de response captura errores 401 globalmente.
5. Al cargar la app, `AuthContext` recupera el token de `localStorage` y rehidrata el estado del usuario y del carpintero (si aplica).

### Guards de Ruta

Se implementan tres guards usando el patrón de `<Outlet />` de React Router:

| Guard           | Lógica                                                         |
|-----------------|----------------------------------------------------------------|
| `PrivateRoute`  | Redirige a `/login` si el usuario no está autenticado          |
| `RegisterRoute` | Redirige a `/` si el usuario **ya** está autenticado           |
| `AdminRoute`    | Redirige a `/login` o `/` si el usuario no tiene rol `admin`   |

### Capa de Servicios

Las llamadas a la API están separadas en tres archivos dentro de `src/services/`:

| Archivo           | Responsabilidad                                                      |
|-------------------|----------------------------------------------------------------------|
| `axiosInstace.ts` | Instancia compartida de Axios con baseURL e interceptores            |
| `api.ts`          | Endpoints de auth y usuario (`/login`, `/register`, `/user`)         |
| `workerApi.ts`    | Endpoints de carpinteros, productos, reseñas y contratos             |
| `admin.ts`        | Endpoints del panel de administración (`/admin/*`)                   |

> **Nota:** `admin.ts` define su propia instancia de Axios localmente en lugar de usar `axiosInstace`. Ambas leen `VITE_API_URL` del entorno.

---

## Estructura de Directorios

```
src/
├── App.tsx                   # Definición del árbol de rutas principal
├── main.tsx                  # Entry point: monta React, ThemeProvider, configura Leaflet
├── index.css                 # Estilos globales (Tailwind directives)
│
├── Pages/                    # Vistas/páginas completas
│   ├── LandingPage.tsx       # Página de inicio con hero, features, testimonials, CTA
│   ├── WorkersPage.tsx       # Listado de carpinteros con búsqueda y paginación
│   ├── CarpenterProfile.tsx  # Perfil del carpintero (tabs: Perfil, Reseñas, Productos, Contratos)
│   ├── UserProfile.tsx       # Perfil del usuario cliente
│   ├── LoginPage.tsx         # Login
│   ├── RegisterPage.tsx      # Registro de usuario (con foto de perfil)
│   ├── RegisterCarpenterPage.tsx # Registro como carpintero
│   ├── AdminPage.tsx         # Layout del panel de administración (sidebar + AppBar)
│   ├── AdminDashboard.tsx    # Dashboard de estadísticas generales
│   ├── AdminUsers.tsx        # Gestión de usuarios
│   ├── AdminCarpinteros.tsx  # Gestión de carpinteros
│   ├── AdminProducts.tsx     # Gestión de productos
│   ├── AdminResenias.tsx     # Gestión de reseñas
│   ├── AdminContratos.tsx    # Gestión de contratos
│   ├── MainPage.tsx          # Layout público (Navbar + <Outlet/>)
│   ├── HomePage.tsx          # Redirige a LandingPage
│   ├── StaticMap.tsx         # Mapa estático de referencia
│   ├── exampleMap.tsx        # Ejemplo de mapa con geolocalización (comentado en rutas)
│   └── pdf.tsx               # Formulario de ejemplo para generación de PDF
│
├── components/               # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── SearchBar.tsx         # Barra de búsqueda y filtros para la lista de carpinteros
│   ├── CarpinterCard.tsx     # Tarjeta de carpintero en el listado
│   ├── Pagination.tsx        # Componente de paginación
│   ├── CustomModal.tsx       # Modal genérico
│   ├── EmptyState.tsx        # Estado vacío para listas sin resultados
│   ├── AboutMeWorker.tsx     # Sección "Sobre mí" del perfil del carpintero
│   ├── ContractPDF.tsx       # Componente PDF con @react-pdf/renderer
│   ├── scroll.tsx            # ScrollToTop al cambiar de ruta
│   ├── Contracts/            # Componentes de gestión de contratos
│   ├── Products/             # Componentes de productos
│   ├── Profiles/             # Formularios de edición de perfil (carpintero e imágenes)
│   ├── Reviews/              # Componentes de reseñas
│   ├── Skeleton/             # Skeletons y mensajes de error/carga
│   ├── User/                 # Componentes de perfil de usuario
│   └── maps/                 # Componentes de mapa interactivo (Leaflet)
│
├── context/
│   └── AuthContext.tsx       # Context: user, worker, loading, LogOut, setUser, setWorker
│
├── hooks/
│   ├── useAuthContext.ts     # Accessor del AuthContext con validación
│   ├── useFetchData.ts       # Hook genérico: { data, loading, error, fetchData }
│   ├── useWorkerSearch.ts    # Hook de búsqueda, filtro, ordenamiento y paginación de carpinteros
│   └── useAddress.ts         # Hook para resolver coordenadas a dirección (Nominatim/OSM)
│
├── services/
│   ├── axiosInstace.ts       # Instancia Axios compartida + interceptores
│   ├── api.ts                # Auth y usuarios
│   ├── workerApi.ts          # Trabajadores, productos, reseñas, contratos
│   └── admin.ts              # Panel de administración
│
├── Interfaces/               # Tipos TypeScript de dominio
│   ├── AuthInterface.ts
│   ├── UserInterface.ts
│   ├── WorkerInterface.ts
│   ├── ContractInterface.ts
│   ├── ProductInterface.ts
│   └── ReviewInterface.ts
│
├── theme/
│   └── theme.ts              # Tema MUI personalizado (paleta, tipografía, overrides)
│
├── test/
│   └── setup.ts              # Setup global de Vitest + @testing-library/jest-dom
│
└── assets/
    └── fondo.png             # Imagen hero de la landing page
```

---

## Rutas de la Aplicación

```
/                          → MainPage (layout con Navbar)
├── /                      → HomePage → LandingPage
├── /workers               → WorkersPage (listado público)
├── /workers/workerProfile/:id  → CarpenterProfile  [requiere login]
├── /user/:id              → UserProfile             [requiere login]
├── /login                 → LoginPage               [solo si NO está logueado]
├── /register              → RegisterPage            [solo si NO está logueado]
├── /registerCarp          → RegisterCarpenterPage
└── /minipdf               → pdf.tsx

/admin                     → AdminPage (layout con sidebar)  [requiere rol admin]
├── /admin                 → AdminDashboard
├── /admin/users           → AdminUsers
├── /admin/carpinteros     → AdminCarpinteros
├── /admin/productos       → AdminProducts
├── /admin/resenias        → AdminResenias
└── /admin/contratos       → AdminContratos
```

---

## Funcionalidades Principales

### Para Clientes
- **Explorar carpinteros:** listado con búsqueda por nombre, taller, dirección, descripción y teléfono; filtro por calificación mínima; ordenamiento por calificación, número de reseñas y nombre.
- **Perfil del carpintero:** galería de imágenes de portada, tabs de información, reseñas con rating, productos en venta y contratos.
- **Contacto directo:** botones flotantes para abrir WhatsApp o llamar al carpintero.
- **Crear reseñas:** los clientes con contrato pueden dejar una calificación y comentario.
- **Gestión de contratos:** crear, ver el estado y descargar contratos en PDF.

### Para Carpinteros
- **Registro de perfil:** información del taller, descripción, ubicación (coordenadas) y galería de imágenes.
- **Editar perfil e imágenes** directamente desde su vista de perfil.
- **Gestionar productos:** crear, editar y eliminar productos con imagen.
- **Gestionar contratos:** aceptar, rechazar o marcar como completados los contratos solicitados.

### Panel de Administración
- Dashboard con totales de usuarios, carpinteros, productos, reseñas y contratos, más listados recientes.
- CRUD de usuarios, carpinteros, productos, reseñas y contratos.

---

## Configuración y Variables de Entorno

Copiar `.env` y ajustar la URL del backend:

```bash
cp .env .env.local
```

Contenido de `.env`:

```env
# API del backend Laravel
VITE_API_URL=http://127.0.0.1:8000/api

# Nombre de la app
VITE_APP_NAME=MiApp
```

### Modos de conexión disponibles

| Modo                   | Variable                                        |
|------------------------|-------------------------------------------------|
| Backend local (`php artisan serve`) | `VITE_API_URL=http://127.0.0.1:8000/api` |
| Backend via Apache local | `VITE_API_URL=http://127.0.0.1/api`          |
| Red local (LAN)         | `VITE_API_URL=http://192.168.x.x/api`          |
| Cloudflare Tunnel       | `VITE_API_URL=https://<tunnel>.trycloudflare.com/api` |

> El servidor de Vite acepta cualquier subdominio de `.trycloudflare.com` como host permitido (configurado en `vite.config.ts`).

---

## Levantar el Proyecto en Local

### Prerrequisitos

- Node.js ≥ 18
- npm ≥ 9
- Backend Laravel corriendo y accesible en la URL configurada en `.env`

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd ProyectoDeGradoFE

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env .env.local
# Editar VITE_API_URL con la URL de tu backend Laravel

# 4. Levantar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

---

## Scripts Disponibles

| Script              | Descripción                                           |
|---------------------|-------------------------------------------------------|
| `npm run dev`       | Inicia el servidor de desarrollo con HMR              |
| `npm run build`     | Compila TypeScript y genera el bundle de producción   |
| `npm run preview`   | Sirve el bundle de producción localmente              |
| `npm run lint`      | Ejecuta ESLint sobre todo el proyecto                 |
| `npm run test`      | Ejecuta los tests en modo watch con Vitest            |
| `npm run test:run`  | Ejecuta los tests una sola vez (modo CI)              |
| `npm run test:ui`   | Abre la UI interactiva de Vitest en el navegador      |
| `npm run test:coverage` | Genera el reporte de cobertura de tests          |

---

## Tests

Los tests se ubican dentro de `src/services/` y `src/hooks/`, junto a los archivos que prueban. El entorno de testing es **jsdom** y se usa **axios-mock-adapter** para simular respuestas HTTP sin realizar peticiones reales.

Archivos de test:

| Archivo                          | Qué cubre                                      |
|----------------------------------|------------------------------------------------|
| `src/services/authService.test.ts`  | Funciones de `api.ts` (login, register, getUserData, etc.) |
| `src/services/workerService.test.ts` | Funciones de `workerApi.ts`                 |
| `src/hooks/useFetchData.test.ts`    | Hook genérico `useFetchData`                |

```bash
# Ejecutar todos los tests
npm run test:run

# Ver cobertura
npm run test:coverage
```

---

## Conexión con el Backend

Este frontend requiere el backend **Laravel** del proyecto. La API base está definida en `VITE_API_URL`.

### Endpoints principales consumidos

| Recurso        | Método | Endpoint                              |
|----------------|--------|---------------------------------------|
| Login          | POST   | `/login`                              |
| Registro       | POST   | `/register`                           |
| Usuario actual | GET    | `/user`                               |
| Usuario por ID | GET    | `/user/{id}`                          |
| Actualizar usuario | POST | `/user/{id}`                        |
| Carpinteros    | GET    | `/trabajador`                         |
| Carpintero por ID | GET | `/trabajador/{id}`                   |
| Carpintero del usuario | GET | `/userTrabajador/{userId}`       |
| Registrar carpintero | POST | `/trabajador`                     |
| Actualizar info carpintero | PATCH | `/trabajador/{id}/info`     |
| Actualizar imágenes | POST | `/trabajador/{id}/images`          |
| Reseñas de usuario | GET | `/resenia/user/{id}`                |
| Reseñas de carpintero | GET | `/resenia/trabajador/{id}`       |
| Crear reseña   | POST   | `/resenia`                            |
| Productos de carpintero | GET | `/productos/{workerId}`          |
| Crear producto | POST   | `/productos`                          |
| Actualizar producto | POST | `/productos/{id}`                  |
| Eliminar producto | DELETE | `/productos/{id}`                 |
| Contratos del carpintero | GET | `/contrato/{workerId}`          |
| Contratos carpintero+cliente | GET | `/contrato/{workerId}/{clientId}` |
| Crear contrato | POST   | `/contrato`                           |
| Actualizar contrato | PUT | `/contrato/{id}`                    |
| Actualizar estado contrato | PATCH | `/contrato/{id}/status`       |
| Eliminar contrato | DELETE | `/contrato/{id}`                  |
| Dashboard admin | GET   | `/admin/dashboard`                    |
| Usuarios admin | GET    | `/admin/users`                        |
| Carpinteros admin | GET  | `/admin/carpinteros`                  |
| Productos admin | GET   | `/admin/productos`                    |
| Reseñas admin  | GET    | `/admin/reseñas`                      |
| Contratos admin | GET   | `/admin/contratos`                    |

La geocodificación inversa (coordenadas → dirección) se realiza directamente contra la API pública de **OpenStreetMap Nominatim** (`https://nominatim.openstreetmap.org/reverse`), sin pasar por el backend.
