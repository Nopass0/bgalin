#!/bin/sh

SSL_DIR="/etc/letsencrypt/live/bgalin.ru"

if [ ! -d "$SSL_DIR" ]; then
    echo "SSL certificate not found. Generating self-signed certificate..."
    mkdir -p "$SSL_DIR"
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$SSL_DIR/privkey.pem" \
        -out "$SSL_DIR/fullchain.pem" \
        -subj "/CN=bgalin.ru"
    echo "Self-signed certificate generated."
else
    echo "SSL certificate found."
fi

# Uncomment SSL configuration in nginx.conf
sed -i 's/# listen 443 ssl;/listen 443 ssl;/' /etc/nginx/conf.d/default.conf
sed -i 's/# ssl_certificate/ssl_certificate/' /etc/nginx/conf.d/default.conf
sed -i 's/# ssl_certificate_key/ssl_certificate_key/' /etc/nginx/conf.d/default.conf
