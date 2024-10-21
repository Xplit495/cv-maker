FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    pkg-config

RUN docker-php-ext-install pdo pdo_sqlite

COPY ./backend /var/www/html/backend

COPY ./frontend /var/www/html/frontend

WORKDIR /var/www/html

EXPOSE 80

CMD ["php-fpm"]
