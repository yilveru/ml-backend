# Backend - NestJS Marketplace

Este es el backend del marketplace desarrollado con NestJS. Proporciona APIs para la autenticación, gestión de usuarios y productos.

## 📂 Estructura del Proyecto

```
src/
│── auth/              # Módulo de autenticación (registro, login, JWT)
│── products/          # Módulo de productos (CRUD de productos)
│── users/             # Módulo de usuarios (gestión de perfiles)
│── app.module.ts      # Módulo principal de la aplicación
│── main.ts            # Punto de entrada de la aplicación
│── app.controller.ts  # Controlador de ejemplo
│── app.service.ts     # Servicio de ejemplo
├── test/              # Pruebas de la aplicación
├── docker-compose.yml # Configuración de PostgreSQL con Docker
├── package.json       # Dependencias del proyecto
└── tsconfig.json      # Configuración de TypeScript
```

## 🚀 Despliegue y Ejecución

### 1️⃣ Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db
JWT_SECRET=tu_secreto_jwt
PORT=3000
```

### 2️⃣ Instalar dependencias

```sh
npm install
```

### 3️⃣ Opcional: Levantar PostgreSQL con Docker

Si no tienes una base de datos configurada, puedes usar Docker:

```sh
docker-compose up -d
```

Esto levantará un contenedor de PostgreSQL con la configuración definida en `docker-compose.yml`.

### 4️⃣ Ejecutar el backend

```sh
npm run start:dev
```

El backend estará disponible en `https://ml-backend-production-1711.up.railway.app`.

## 📖 Documentación con Swagger

Después de ejecutar el backend, accede a la documentación de las APIs en:

```
https://ml-backend-production-1711.up.railway.app/api/docs
```

## 🌎 Despliegue en Railway

1. Crea un nuevo proyecto en [Railway](https://railway.app/).
2. Conecta tu repositorio de GitHub.
3. Configura las variables de entorno (`DATABASE_URL`, `JWT_SECRET`, etc.).
4. Despliega tu backend con Railway.

¡Listo! Tu backend ahora estará en producción.

---

⚡ _Desarrollado con NestJS y ❤️_
