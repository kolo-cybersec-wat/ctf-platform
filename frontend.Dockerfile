FROM node:20 as builder

WORKDIR /opt/ctf-platform-frontend

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:1.23

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/
COPY nginx-app.conf /etc/nginx/conf.d/app.conf.template

ENV NGINX_ROOT /opt/nginx
RUN mkdir -p $NGINX_ROOT
WORKDIR $NGINX_ROOT

COPY entrypoint.frontend.sh .

COPY --from=builder /opt/ctf-platform-frontend/dist ./dist

ENTRYPOINT ["/bin/sh", "-c"]

CMD ["sh /opt/nginx/entrypoint.frontend.sh"]