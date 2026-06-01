#!/bin/sh
set -e

# 1. Swap the Nginx placeholder with the dynamic port assigned by Render
if [ -z "$PORT" ]; then
  echo "PORT environment variable is not set. Defaulting Nginx to 8080..."
  export PORT=8080
fi

sed -i "s/%PORT%/${PORT}/g" /etc/nginx/http.d/default.conf

# 2. Execute Laravel optimizations for snappy production execution
echo "Running Laravel build-phase caching optimizations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 3. Fire up Supervisor to manage PHP-FPM, Nginx, and Reverb simultaneously
echo "Starting application process lifecycle supervisor..."
exec supervisord -c /etc/supervisor/conf.d/supervisord.conf