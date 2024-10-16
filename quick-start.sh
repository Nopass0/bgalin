#!/bin/bash

# Функция для генерации случайной строки
generate_random_string() {
    openssl rand -base64 12 | tr -dc 'a-zA-Z0-9' | head -c 12
}

# Проверка и установка docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo "docker-compose не установлен. Устанавливаем..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Обновление репозитория
git pull origin main

# Проверка наличия .env файла
if [ ! -f .env ]; then
    echo "Файл .env не найден. Создаем новый файл с случайными параметрами..."
    ADMIN_CODE=$(generate_random_string)
    cat << EOF > .env
POSTGRES_USER=user
POSTGRES_PASSWORD=$(generate_random_string)
POSTGRES_DB=bgalin

DATABASE_URL=postgresql://user:$(generate_random_string)@db:5432/bgalin
SERVER_PORT=3000

CLIENT_PORT=80
CLIENT_SSL_PORT=443

ADMIN_CODE=$ADMIN_CODE

SSL_EMAIL=your_email@example.com

INN=XXXXXXXXXX
EOF
    echo "Файл .env создан. Пожалуйста, проверьте и отредактируйте его при необходимости."
    echo "Сгенерированный код администратора: $ADMIN_CODE"
    echo "Не забудьте заменить XXXXXXXXXX на ваш реальный ИНН в файле .env"
else
    echo "Файл .env уже существует. Используем существующие параметры."
    ADMIN_CODE=$(grep ADMIN_CODE .env | cut -d '=' -f2)
    echo "Текущий код администратора: $ADMIN_CODE"
fi

# Запуск docker-compose
docker-compose up -d

echo "Приложение запущено. Проверьте логи с помощью команды 'docker-compose logs -f'"
