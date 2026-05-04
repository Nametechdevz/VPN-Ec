# 🎬 CineMax - Página de Películas con TMDB

Sitio web de películas y series usando la API gratuita de [The Movie Database (TMDB)](https://www.themoviedb.org).

## Características

- 🔥 Tendencias del día (películas y series)
- 🎬 Populares, Mejor Calificadas, Próximos Estrenos
- 🔍 Búsqueda en tiempo real
- 📄 Página de detalle con reparto, tráiler y similares
- 📱 100% responsivo (mobile, tablet, desktop)
- ⚡ Sin frameworks, solo HTML/CSS/JS puro
- 🌍 En español (configurable)

## Instalación en Hosting

### 1. Obtener API Key de TMDB (GRATIS)
1. Ir a [themoviedb.org](https://www.themoviedb.org) y crear cuenta
2. Ir a **Configuración → API** → Solicitar API Key (tipo: Developer)
3. Copiar tu **API Key (v3 auth)**

### 2. Configurar el sitio
Editar el archivo `config.js`:
```js
const CONFIG = {
  API_KEY: 'TU_API_KEY_AQUI',  // ← Pegar aquí tu API Key
  LANGUAGE: 'es-MX',            // Idioma
  SITE_NAME: 'CineMax',         // Nombre de tu sitio
  SITE_LOGO: '🎬',              // Emoji logo
};
```

### 3. Subir al hosting
Subir **todos los archivos** al servidor:
```
index.html
movie.html
config.js
.htaccess
css/
  style.css
js/
  api.js
  app.js
  movie.js
```

### Compatibilidad de Hosting
- ✅ cPanel / Hostinger / Bluehost / SiteGround
- ✅ Namecheap
- ✅ GitHub Pages (gratuito)
- ✅ Netlify / Vercel (gratuito)
- ✅ Cualquier hosting con soporte de archivos estáticos

### GitHub Pages (Hosting Gratuito)
1. Subir archivos al repositorio
2. Ir a Settings → Pages → Source: main branch
3. Tu sitio estará en `https://usuario.github.io/repositorio`

### Netlify (Hosting Gratuito)
1. Ir a [netlify.com](https://netlify.com)
2. Arrastrar la carpeta del proyecto
3. ¡Listo! URL automática

## Estructura de Archivos
```
/
├── index.html          # Página principal
├── movie.html          # Detalle de película/serie
├── config.js           # ← EDITA ESTO con tu API Key
├── .htaccess           # Config Apache
├── css/
│   └── style.css       # Estilos
└── js/
    ├── api.js          # Módulo API TMDB
    ├── app.js          # Lógica homepage
    └── movie.js        # Lógica página detalle
```

## Personalización

### Cambiar idioma
En `config.js` cambiar `LANGUAGE`:
- `es-MX` → Español México
- `es-ES` → Español España
- `en-US` → English
- `pt-BR` → Português

### Cambiar colores
En `css/style.css`, editar las variables CSS:
```css
:root {
  --accent: #e50914;   /* Color principal (rojo Netflix) */
  --bg: #0d0d0f;       /* Fondo oscuro */
}
```

## Créditos
- Datos: [The Movie Database (TMDb)](https://www.themoviedb.org)
- Este producto usa la API de TMDb pero no está respaldado ni certificado por TMDb.
