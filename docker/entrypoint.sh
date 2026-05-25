#!/bin/sh
# Use the PORT provided by Render
PORT="${PORT:-8080}"

# Update Nginx listen port
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/nginx.conf

# Start supervisord using the explicit config file path
exec /usr/bin/supervisord -c /etc/supervisord.conf