FROM archlinux:latest
RUN pacman -Syu --noconfirm
RUN pacman -S php php-pgsql php-pgsql composer --noconfirm
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --working-dir=/root

EXPOSE 8080
CMD ["php","/root/bin/battle-server.php"]
