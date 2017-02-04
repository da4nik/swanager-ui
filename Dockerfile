FROM nginx:1.11.9-alpine

COPY deploy/swanager-ui.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/html/
