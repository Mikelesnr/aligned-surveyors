# Stage 1: Base PHP + Composer
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

# Install JS dependencies
RUN npm install && npm run build

# Copy application code
COPY . .

# Ensure correct permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port for Reverb WebSocket server
EXPOSE 

# Copy custom Nginx config from /docker/ into container
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Start PHP-FPM + Nginx
CMD ["/docker/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
