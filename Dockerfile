# Utiliser l'image PHP avec Nginx intégré
FROM php:8.2-fpm

# Installer les dépendances pour sqlite3
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    pkg-config

# Installer les extensions nécessaires pour SQLite
RUN docker-php-ext-install pdo pdo_sqlite

# Copier les fichiers du backend
COPY ./backend /var/www/html/backend

# Copier les fichiers du frontend
COPY ./frontend /var/www/html/frontend

# Définir le répertoire de travail
WORKDIR /var/www/html

EXPOSE 80

CMD ["php-fpm"]
