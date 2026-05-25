#!/bin/sh
# Check if PORT is set, default to 8080 if not
: "${PORT:=8080}"

echo "Configuring Nginx to listen on port: $PORT"

# Replace ${PORT} with actual value
sed -i "s/\${PORT}/$PORT/g" /etc/nginx/nginx.conf

# Verify replacement
echo "Nginx config set to:"
grep "listen" /etc/nginx/nginx.conf

# Start supervisor
exec /usr/bin/supervisord -n -c /etc/supervisord.conf