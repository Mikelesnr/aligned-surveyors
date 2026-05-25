#!/bin/sh
# Use the PORT provided by Render, default to 8080
PORT="${PORT:-8080}"

# Replace listen 80; in your nginx.conf with the Render PORT
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/nginx.conf

# Run package discovery and cache commands at runtime
php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache

# Start Supervisor
exec /usr/bin/supervisord -c /etc/supervisord.conf