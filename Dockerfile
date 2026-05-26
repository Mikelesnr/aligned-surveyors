# Stage 1: Build frontend
FROM node:20-slim AS frontend
WORKDIR /app
COPY package.json vite.config.js tailwind.config.js postcss.config.cjs ./
COPY resources resources
RUN npm install && npm run build

# Stage 2: Laravel backend
FROM php:8.2-fpm-alpine AS backend

# Add linux-headers and ensure we have build tools
RUN apk add --no-cache \
    nginx curl zip unzip git libpng-dev libjpeg-turbo-dev \
    libwebp-dev libxpm-dev freetype-dev oniguruma-dev icu-dev bash shadow \
    postgresql-dev nodejs npm supervisor linux-headers

RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd intl sockets

WORKDIR /var/www/html
COPY . .
# Explicitly copy assets
COPY --from=frontend /app/public/build ./public/build

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Fix permissions for the user that runs Nginx/PHP
RUN mkdir -p /var/www/html/storage/framework/views \
             /var/www/html/storage/framework/cache \
             /var/www/html/storage/framework/sessions \
             /var/www/html/storage/logs \
             /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8080 8081
CMD ["/usr/local/bin/entrypoint.sh"]