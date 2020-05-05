FROM archlinux:latest
RUN pacman -Syu --noconfirm
RUN pacman -S php php-pgsql php-pgsql --noconfirm
EXPOSE 8080
CMD ["php","/root/bin/battle-server.php"]
