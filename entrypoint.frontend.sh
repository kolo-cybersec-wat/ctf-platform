#!/usr/bin/sh

set -e

envsubst '
${NGINX_SERVER_NAME}
${NGINX_BACK_URL}
'< /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf

envsubst '
${BACKEND_URL}
' <  /opt/nginx/dist/index.html >  /opt/nginx/dist/index.html.subst

cp -pf  /opt/nginx/dist/index.html.subst  /opt/nginx/dist/index.html

ls

exec nginx -g 'daemon off;'