#!/bin/sh
PORT="${PORT:-8080}"

# Update Nginx listen port
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/nginx.conf

# Run required Laravel setup
php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache

# Start Supervisor
exec /usr/bin/supervisord -c /etc/supervisord.conf