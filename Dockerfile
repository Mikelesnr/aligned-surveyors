# Stage 1: Build frontend
FROM node:20-slim AS frontend
WORKDIR /app
COPY package.json vite.config.js tailwind.config.js postcss.config.cjs ./
COPY resources resources
RUN npm install && npm run build

# Stage 2: Web Server
FROM php:8.2-fpm-alpine
RUN apk add --no-cache nginx libpng-dev libjpeg-turbo-dev libwebp-dev freetype-dev oniguruma-dev icu-dev bash
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd intl

WORKDIR /var/www/html
COPY . .
COPY --from=frontend /app/public/build ./public/build

# Setup
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
EXPOSE 8080
CMD ["/usr/local/bin/entrypoint.sh"]