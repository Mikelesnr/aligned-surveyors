#!/bin/sh
# Replace $PORT in nginx.conf with the actual port Render provides
sed -i "s/\${PORT}/$PORT/g" /etc/nginx/nginx.conf
# Start supervisord
/usr/bin/supervisord -c /etc/supervisord.conf