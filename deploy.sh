#!/bin/bash
# Instalación rápida en VPS - acceso por IP
# Uso: sudo bash deploy.sh

set -e

SITE_DIR="/var/www/ytfree"

echo "===== Instalando YTFree ====="

# Instalar nginx si falta
if ! command -v nginx &>/dev/null; then
  apt-get update -q && apt-get install -y nginx
fi

# Copiar archivos al directorio web
mkdir -p "$SITE_DIR"
cp -r . "$SITE_DIR/"

# Configurar nginx
cp "$SITE_DIR/nginx.conf" /etc/nginx/sites-available/ytfree
ln -sf /etc/nginx/sites-available/ytfree /etc/nginx/sites-enabled/ytfree
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

IP=$(hostname -I | awk '{print $1}')
echo ""
echo "✅ Listo. Abre en tu navegador:"
echo "   http://$IP"
echo ""
