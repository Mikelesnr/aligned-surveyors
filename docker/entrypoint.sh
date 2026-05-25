#!/bin/sh
# Render assigns a PORT via env var; use it to rewrite nginx.conf
sed -i "s/listen 80;/listen ${PORT:-8080};/" /etc/nginx/nginx.conf

# Start supervisord
/usr/bin/supervisord -c /etc/supervisord.conf