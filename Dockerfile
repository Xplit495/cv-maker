FROM php:8.2-apache

RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev zip unzip
RUN docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock /var/www/html/

RUN composer install --no-dev --prefer-dist --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
