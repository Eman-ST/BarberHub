# 📖 Descripción

**BarberHub** es una aplicación web desarrollada para facilitar la conexión entre clientes y barberías cercanas mediante una plataforma moderna, intuitiva y segura.

La plataforma permite a los usuarios localizar barberías utilizando su ubicación en tiempo real, consultar servicios, conocer información del establecimiento, reservar citas y realizar el pago de un anticipo para confirmar su reservación.

Por otra parte, los propietarios de barberías disponen de herramientas para administrar sus establecimientos, gestionar empleados, controlar horarios, organizar citas y mejorar la experiencia de sus clientes.

---

# 🚀 Objetivo

Desarrollar una aplicación web que permita conectar clientes con barberías cercanas mediante servicios de geolocalización, administración de citas y pagos electrónicos, optimizando la gestión de los establecimientos y mejorando la experiencia de los usuarios.

---

# ✨ Características

## 👤 Clientes

- Registro e inicio de sesión.
- Recuperación de contraseña.
- Búsqueda de barberías cercanas.
- Visualización en Google Maps.
- Consulta de servicios.
- Agenda de citas.
- Pago de anticipo.
- Historial de citas.
- Opiniones y calificaciones.
- Gestión del perfil.

---

## 💈 Owners

- Registro de barberías.
- Administración de empleados.
- Gestión de servicios.
- Administración de horarios.
- Confirmación de citas.
- Estadísticas del negocio.
- Administración del perfil de la barbería.

---

## 🛡️ Administrador

- Gestión de usuarios.
- Administración de barberías.
- Moderación de opiniones.
- Supervisión de citas.
- Administración general del sistema.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM

## Backend

- Supabase
- PostgreSQL

## APIs

- Google Maps Platform API
- Mercado Pago API

## Herramientas

- Git
- GitHub
- Visual Studio Code

---

# 🏗️ Arquitectura

```
Cliente
      │
      ▼
 React + Vite + Tailwind
      │
      ▼
 Supabase
 ├── Authentication
 ├── PostgreSQL
 ├── Storage
 └── API REST
      │
      ▼
Google Maps API
Mercado Pago API
```

---

# 📋 Flujo de una cita

```text
Cliente

↓

Busca barbería cercana

↓

Selecciona barbería

↓

Selecciona servicio

↓

Selecciona fecha y horario

↓

Envía solicitud

↓

Barbero confirma la cita

↓

Cliente recibe notificación

↓

Pago del anticipo

↓

Cita confirmada

↓

Servicio realizado

↓

Cliente deja una opinión
```

---

# 📁 Estructura del proyecto

```
BarberHub
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── App.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Instalación

## Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/BarberHub.git
```

## Entrar al proyecto

```bash
cd BarberHub
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm run dev
```

---

# 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

VITE_GOOGLE_MAPS_API_KEY=

VITE_MERCADO_PAGO_PUBLIC_KEY=
```

---

# 📌 Estado del proyecto

🚧 En desarrollo.

Actualmente se encuentra en implementación de nuevas funcionalidades y mejoras continuas.

---

# 📈 Próximas funcionalidades

- Notificaciones en tiempo real.
- Sistema de promociones.
- Programa de fidelización.
- Panel de estadísticas avanzadas.
- Reportes.
- Favoritos.
- Chat entre cliente y barbería.
- Aplicación móvil.

---

```bash
git checkout -b feature/nueva-funcionalidad
```

3. Realiza tus cambios.

4. Haz commit.

```bash
git commit -m "Agrega nueva funcionalidad"
```

5. Haz push.

```bash
git push origin feature/nueva-funcionalidad
```

6. Abre un Pull Request.

---

# 👨‍💻 Autores

**Los estudiantes de la uttecam**

Proyecto desarrollado durante la Estadía TSU 2026 para **Barfest Mixology**.
