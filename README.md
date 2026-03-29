# Lucca Sneakers

Sitio web para Lucca Sneakers — tienda de sneakers premium en Tepito, CDMX.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Base de datos:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma con adapter Neon
- **Deploy:** Vercel

## Setup Local

```bash
# 1. Clona el repositorio
git clone <repo-url>
cd lucca-sneakers

# 2. Instala dependencias
npm install

# 3. Configura variables de entorno
cp .env.example .env
# Edita .env con tu DATABASE_URL de Neon

# 4. Sincroniza la base de datos
npx prisma db push

# 5. Carga datos iniciales
npx prisma db seed

# 6. Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el sitio.

## Deploy en Vercel

1. Conecta el repositorio a [Vercel](https://vercel.com)
2. En **Settings > Environment Variables**, agrega:
   - `DATABASE_URL` — connection string de tu base de datos Neon
3. Haz deploy — Vercel ejecutará automáticamente `prisma generate` durante el build

## Estructura del Sitio

| Ruta | Descripcion |
|------|-------------|
| `/` | Home — hero, productos destacados, testimonios, CTAs |
| `/catalogo` | Catalogo completo con filtro por marca |
| `/mayoreo` | Informacion para mayoristas — precios, proceso, FAQ |
| `/contacto` | WhatsApp, mapa de Tepito, redes sociales |
| `/admin` | Panel de administracion para gestionar productos |

## Agregar/Cambiar Imagenes de Productos

1. Sube tus imagenes a un CDN o a `/public/products/`
2. En el panel admin (`/admin`), agrega la URL de imagen al crear o editar un producto
3. **Formato recomendado:** 800x600px, `.webp`, menos de 200KB
4. Si no hay imagen, se muestra un placeholder con gradiente oscuro

## Panel de Administracion

Accede a `/admin` para:
- Ver estadisticas del catalogo
- Agregar nuevos productos
- Marcar productos como Nuevo/Hot
- Activar/desactivar productos (soft delete)

> **Nota:** El admin actualmente no tiene autenticacion. Se recomienda agregar auth antes de produccion.

## Base de Datos

El proyecto usa Prisma con 3 modelos:
- **Product** — catalogo de sneakers
- **Testimonial** — resenas de clientes
- **FAQ** — preguntas frecuentes de mayoreo

Para ver/editar datos directamente:
```bash
npx prisma studio
```

## Contacto

- **WhatsApp:** [735 388 4148](https://wa.me/527353884148)
- **Ubicacion:** Tepito, Cuauhtemoc, Ciudad de Mexico
