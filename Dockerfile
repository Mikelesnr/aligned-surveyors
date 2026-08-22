# =====================================================================
# STAGE 1: Build the React / Inertia Frontend Assets
# =====================================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# =====================================================================
# STAGE 2: Build the Production PHP-FPM / Nginx / Supervisor Container
# =====================================================================
FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    icu-dev \
    oniguruma-dev \
    linux-headers \
    postgresql-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        zip \
        exif \
        pcntl \
        bcmath \
        gd \
        intl \
        opcache

RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

WORKDIR /var/www

COPY . .

COPY --from=frontend-builder /app/public/build ./public/build

# 1. Force-create resources/views and ALL storage/framework subpaths that
#    .dockerignore strips out of the build context (views, sessions, cache).
#    config('view.compiled') uses realpath() on storage/framework/views,
#    which silently returns false (not an error) if the dir is missing,
#    so this must run before any config/view cache command.
#    NOTE: no brace expansion -- /bin/sh in alpine (ash) doesn't support it.
RUN mkdir -p storage/framework/sessions \
    && mkdir -p storage/framework/views \
    && mkdir -p storage/framework/cache/data \
    && mkdir -p storage/app/public \
    && mkdir -p storage/logs \
    && mkdir -p bootstrap/cache \
    && mkdir -p resources/views

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache

RUN composer install --no-dev --no-scripts --optimize-autoloader --no-interaction --no-progress

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

RUN composer dump-autoload --optimize

COPY ./docker/nginx.conf /etc/nginx/http.d/default.conf
COPY ./docker/supervisor.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]