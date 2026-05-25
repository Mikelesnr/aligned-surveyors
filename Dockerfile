FROM serversideup/php:8.4-fpm-nginx
USER root

# Install Node.js + npm
RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /var/www/html

# Copy entire Laravel app
COPY . .

# Copy configs
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/laravel.conf /etc/supervisor/conf.d/laravel.conf

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose ports
EXPOSE 80 6001

# Start Supervisor (manages php-fpm, nginx, reverb, node)
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
