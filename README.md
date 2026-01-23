# Frontend Portal de Empleo

Este proyecto es el frontend para el sistema de Portal de Empleo, desarrollado con tecnologías modernas como **Next.js 15**, **React 19** y **Tailwind CSS 4**.

## 🚀 Cómo correr el proyecto

Sigue estos pasos para instalar y ejecutar el entorno de desarrollo en tu máquina local.

### 1. Prerrequisitos
Asegúrate de tener instalado **Node.js** (versión recomendada 18 o superior).

### 2. Instalación de dependencias
Ejecuta el siguiente comando en la raíz del proyecto para instalar las librerías necesarias:

npm install
# o si usas yarn
yarn install
# o pnpm
pnpm install


### 3. Ejecutar el servidor de desarrollo

Para levantar el proyecto localmente, ejecuta:

npm run dev

El servidor iniciará generalmente en [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

---

## 🔗 Rutas Principales del Proyecto

Una vez que el servidor esté corriendo, puedes acceder a las siguientes rutas clave en tu navegador:

### 👤 Dashboard del Candidato (Postulante)

* **Inicio del Dashboard:** `http://localhost:3000/dashboard/candidato`
* **Buscar Empleos:** `http://localhost:3000/dashboard/candidato/buscar-empleos`
* **Mis Postulaciones:** `http://localhost:3000/dashboard/candidato/mis-empleos`
* **Mi Perfil:** `http://localhost:3000/dashboard/candidato/mi-perfil`
* **Mensajes:** `http://localhost:3000/dashboard/candidato/mensajes`
* **Notificaciones:** `http://localhost:3000/dashboard/candidato/notificaciones`

### 🛡️ Dashboard del Administrador

* **Panel Principal:** `http://localhost:3000/dashboard-admin/administrador`
* **Gestión de Usuarios:** `http://localhost:3000/dashboard-admin/administrador/usuarios`
* **Gestión de Vacantes:** `http://localhost:3000/dashboard-admin/administrador/vacantes`
* **Reportes:** `http://localhost:3000/dashboard-admin/administrador/reportes`
* **Soporte Técnico:** `http://localhost:3000/dashboard-admin/administrador/soporte-tecnico`

### 🔐 Autenticación

* **Iniciar Sesión:** `http://localhost:3000/auth/login`
* **Registro Candidato:** `http://localhost:3000/auth/register/candidato`
* **Registro Empresa:** `http://localhost:3000/auth/register/empresa`
* **Registro Universidad:** `http://localhost:3000/auth/register/universidad`

---

## 🛠️ Tecnologías Utilizadas

* **[Next.js 15](https://nextjs.org/)**: Framework de React para producción (App Router).
* **[React 19](https://react.dev/)**: Biblioteca para interfaces de usuario.
* **[Tailwind CSS 4](https://tailwindcss.com/)**: Framework de utilidades CSS.
* **Componentes UI**: Radix UI (Accordion, Dropdown, Dialog, etc.).
* **Iconos**: Lucide React.
* **Gráficos**: Recharts.
* **Formularios**: React Hook Form.
