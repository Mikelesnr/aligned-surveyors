FROM serversideup/php:8.4-fpm-nginx AS laravel-app
USER root

# Install Node.js + npm for frontend build
RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /var/www/html

# Copy dependency files first (layer caching)
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install JS dependencies and build assets
RUN npm install && npm run build

# Copy application code
COPY . .

# Copy Nginx and Supervisor configs from /docker/
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/laravel.conf

# Ensure correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose ports
EXPOSE 80 6001

# Start Supervisor (manages php-fpm, nginx, reverb)
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
