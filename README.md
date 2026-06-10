# Cash Tracker

Aplicación personal para el control de presupuestos y gastos. Permite registrar ingresos, hacer seguimiento de tus finanzas de forma sencilla.

## Stack

- **[Nuxt 4](https://nuxt.com/)** — Framework fullstack Vue
- **[Nuxt UI](https://ui.nuxt.com/)** — Componentes de interfaz
- **[Prisma](https://www.prisma.io/)** con **[Neon](https://neon.tech/)** — ORM y base de datos PostgreSQL serverless
- **[nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils)** — Manejo de sesiones
- **[Zod](https://zod.dev/)** — Validación de esquemas
- **[Nodemailer](https://nodemailer.com/) + [Mailtrap](https://mailtrap.io/)** — Envío de correos

## Requisitos previos

- Node.js 20 o superior
- [pnpm](https://pnpm.io/)
- Cuenta en [Neon](https://neon.tech/) para la base de datos PostgreSQL
- Cuenta en [Mailtrap](https://mailtrap.io/) para el servicio de correo

## Instalación y desarrollo

1. Clonar el repositorio

   ```bash
   git clone <url-del-repositorio>
   cd cash-tracker
   ```

2. Instalar dependencias

   ```bash
   pnpm install
   ```

3. Configurar variables de entorno

   ```bash
   cp .env.template .env
   ```

   Edita `.env` con tus credenciales (ver sección [Variables de entorno](#variables-de-entorno)).

4. Aplicar migraciones a la base de datos

   ```bash
   pnpm migrate <nombre-de-la-migración>
   ```

5. Generar el cliente de Prisma

   ```bash
   pnpm prisma-generate
   ```

6. Iniciar el servidor de desarrollo

   ```bash
   pnpm dev
   ```

## Variables de entorno

| Variable                | Descripción                                                                  |
|-------------------------|------------------------------------------------------------------------------|
| `DATABASE_URL`          | Cadena de conexión a la base de datos Neon (formato `prisma+postgres://...`) |
| `NUXT_MAILTRAP_HOST`    | Host SMTP de Mailtrap                                                        |
| `NUXT_MAILTRAP_PORT`    | Puerto SMTP de Mailtrap                                                      |
| `NUXT_MAILTRAP_USER`    | Usuario SMTP de Mailtrap                                                     |
| `NUXT_MAILTRAP_PASS`    | Contraseña SMTP de Mailtrap                                                  |
| `NUXT_SESSION_PASSWORD` | Contraseña para cifrar la sesión (mínimo 32 caracteres)                      |
| `NUXT_FRONTEND_URL`     | URL base del frontend, p. ej. `http://localhost:3000`                        |

## Scripts

| Comando                 | Descripción                           |
|-------------------------|---------------------------------------|
| `pnpm dev`              | Inicia el servidor de desarrollo      |
| `pnpm build`            | Compila la aplicación para producción |
| `pnpm preview`          | Previsualiza el build de producción   |
| `pnpm generate`         | Genera el sitio estático              |
| `pnpm migrate <nombre>` | Crea y aplica una nueva migración     |
| `pnpm prisma-generate`  | Regenera el cliente de Prisma         |

## Producción

```bash
pnpm build
pnpm preview
```
