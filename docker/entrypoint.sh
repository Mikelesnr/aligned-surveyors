#!/bin/sh
# Render provides $PORT, default to 8080
PORT="${PORT:-8080}"

# Run discovery and cache clear at runtime
php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Update Nginx port
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/nginx.conf

# Start Supervisor
exec /usr/bin/supervisord -c /etc/supervisord.conf