#!/bin/bash
# Script de instalación para VPS Ubuntu/Debian
# Uso: chmod +x deploy.sh && sudo ./deploy.sh

set -e

SITE_DIR="/var/www/ytfree"
NGINX_CONF="/etc/nginx/sites-available/ytfree"

echo "===== Instalando YTFree en VPS ====="

# 1. Instalar nginx si no está instalado
if ! command -v nginx &> /dev/null; then
  echo "Instalando nginx..."
  apt-get update -q
  apt-get install -y nginx
fi

# 2. Crear directorio del sitio
mkdir -p "$SITE_DIR"

# 3. Copiar archivos
cp -r . "$SITE_DIR/"
rm -f "$SITE_DIR/deploy.sh"
rm -f "$SITE_DIR/nginx.conf"
rm -f "$SITE_DIR/generate-icons.html"

# 4. Configurar nginx
cp nginx.conf "$NGINX_CONF"

# Activar sitio
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/ytfree
rm -f /etc/nginx/sites-enabled/default

# 5. Verificar y recargar nginx
nginx -t && systemctl reload nginx

echo ""
echo "===== ✅ Instalación completada ====="
echo ""
echo "IMPORTANTE: Genera los íconos PNG:"
echo "  1. Abre generate-icons.html en Chrome"
echo "  2. Descarga los íconos y ponlos en $SITE_DIR/icons/"
echo ""
echo "Para SSL (HTTPS), ejecuta:"
echo "  apt install certbot python3-certbot-nginx"
echo "  certbot --nginx -d tudominio.com"
echo ""
echo "Accede en: http://$(hostname -I | awk '{print $1}')"
