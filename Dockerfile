# Stage 1: Node build
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: PHP + Nginx
FROM serversideup/php:8.4-fpm-nginx AS laravel-app
USER root
WORKDIR /var/www/html

# Copy composer files and install
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Copy Laravel app
COPY . .

# Copy built frontend assets from Stage 1
COPY --from=frontend /app/public/build ./public/build

# Copy configs
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/laravel.conf

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80 6001
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
