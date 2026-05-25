#!/bin/sh
# Inject the dynamic Render PORT into Nginx config
sed -i "s/\${PORT}/$PORT/g" /etc/nginx/nginx.conf

# Start supervisor in a way that forces output to stdout
echo "Starting Supervisord..."
/usr/bin/supervisord -n -c /etc/supervisord.conf