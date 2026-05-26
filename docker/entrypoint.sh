#!/bin/sh
php artisan storage:link
php artisan config:cache
php artisan route:cache
# Start Nginx in foreground
nginx -g "daemon off;"