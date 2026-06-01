# =====================================================================
# STAGE 1: Build the React / Inertia Frontend Assets
# =====================================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application files and compile the production build
COPY . .
RUN npm run build

# =====================================================================
# STAGE 2: Build the Production PHP-FPM / Nginx / Supervisor Container
# =====================================================================
FROM php:8.3-fpm-alpine

# Install system dependencies, Nginx, Supervisor, and database client headers
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

# Configure and install all required PHP extensions for Laravel, Reverb, MySQL, and PostgreSQL
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

# Apply the optimized production PHP settings configuration
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

WORKDIR /var/www

# Copy the core application files
COPY . .

# COPY THE COMPILED REACT ASSETS FROM STAGE 1
COPY --from=frontend-builder /app/public/build ./public/build

# 1. Ensure the directories exist BEFORE running composer scripts
RUN mkdir -p storage bootstrap/cache

# 2. Grab the latest Composer binary
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. CRITICAL: Install dependencies WITHOUT running automated scripts
# This bypasses the breaking 'package:discover' hook until permissions are ready.
RUN composer install --no-dev --no-scripts --optimize-autoloader --no-interaction --no-progress

# 54. NOW run the autoload dump manually since permissions and directories are fully ready
RUN composer dump-autoload --optimize

# 45. Set strict, secure permissions for Laravel's system directories
RUN chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data /var/www

# Copy structural infrastructure configuration files into place
COPY ./docker/nginx.conf /etc/nginx/http.d/default.conf
COPY ./docker/supervisor.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint.sh

# Grant execution permissions to the runtime entrypoint script
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]