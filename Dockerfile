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
COPY . .

# Setup permissions
RUN mkdir -p bootstrap/cache storage/framework/views storage/framework/sessions storage/framework/cache \
    && chmod -R 775 bootstrap/cache storage \
    && chown -R www-data:www-data bootstrap/cache storage

COPY --from=frontend /app/public/build ./public/build
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Add entrypoint for port dynamic mapping
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080

# Add these lines before CMD
RUN mkdir -p /var/log/nginx /var/lib/nginx /var/log/php82 \
    && chown -R www-data:www-data /var/log/nginx /var/lib/nginx /var/log/php82 \
    && touch /var/run/nginx.pid && chown www-data:www-data /var/run/nginx.pid
    
CMD ["/usr/local/bin/entrypoint.sh"]