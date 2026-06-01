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
# Includes postgresql-dev so Alpine can compile the pdo_pgsql driver natively
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
# This drops the freshly built assets straight into Laravel's public directory
COPY --from=frontend-builder /app/public/build ./public/build

# Install Composer dependencies cleanly for an optimized production environment
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

# Ensure strict secure execution permissions for Laravel's cache and storage architecture
RUN chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data /var/www

# Copy structural infrastructure configuration files into place
COPY ./docker/nginx.conf /etc/nginx/http.d/default.conf
COPY ./docker/supervisor.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint.sh

# Grant execution permissions to the runtime entrypoint script
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose the internal container communication port (Render overrides this with $PORT dynamically)
EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]