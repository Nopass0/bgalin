FROM oven/bun:1

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN bun install

COPY . .

EXPOSE ${SERVER_PORT}

COPY wait-for-it.sh /wait-for-it.sh
COPY start.sh /start.sh
RUN chmod +x /wait-for-it.sh /start.sh

CMD ["/start.sh"]
