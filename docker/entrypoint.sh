#!/bin/sh
PORT="${PORT:-8080}"

# Update Nginx listen port
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/nginx.conf

#  Ensure storage is linked so uploads work
php artisan storage:link

# Clear caches to ensure Laravel finds the new manifest file
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Final safety check on permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/public/build