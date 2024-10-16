FROM oven/bun:1 as build

WORKDIR /app

COPY package*.json ./
RUN bun install

COPY . .

ARG VITE_INN
ENV VITE_INN=$VITE_INN

RUN bun run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl-check.sh /ssl-check.sh
RUN chmod +x /ssl-check.sh

EXPOSE 80 443

CMD ["/bin/sh", "-c", "/ssl-check.sh && nginx -g 'daemon off;'"]
