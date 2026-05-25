# Stage 1: Build frontend
FROM node:20-slim AS frontend
WORKDIR /app
COPY package.json vite.config.js tailwind.config.js postcss.config.cjs ./
COPY resources resources
RUN npm install && npm run build

# Stage 2: Laravel backend
FROM php:8.2-fpm-alpine AS backend
RUN apk add --no-cache nginx curl zip unzip git libpng-dev libjpeg-turbo-dev \
    libwebp-dev libxpm-dev freetype-dev oniguruma-dev icu-dev bash shadow \
    postgresql-dev nodejs npm supervisor

RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd intl

WORKDIR /var/www/html

# Copy application files
COPY . .

# Copy frontend assets
COPY --from=frontend /app/public/build ./public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Setup Permissions - DO THIS AFTER ALL COPIES
RUN mkdir -p storage/framework/views storage/framework/sessions storage/framework/cache bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy configurations
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080
CMD ["/usr/local/bin/entrypoint.sh"]