# syntax=docker/dockerfile:1.7
FROM nginx:1.27-alpine AS runtime

RUN printf '%s\n' \
'server {' \
'  listen 80;' \
'  server_name _;' \
'  root /usr/share/nginx/html;' \
'  index index.html;' \
'' \
'  location /assets/ {' \
'    expires 1y;' \
'    add_header Cache-Control "public, immutable";' \
'    try_files $uri =404;' \
'  }' \
'' \
'  location / {' \
'    try_files $uri /index.html;' \
'  }' \
'}' > /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
