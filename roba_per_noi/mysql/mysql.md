# INSTALL MYSQL 

## for manjaro:
``` 
sudo pacman -S mariadb 
sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl enable mariadb.service
sudo systemctl start mariadb.service
sudo pip install pymysql
```

togliere i commenti(```;```) in ```/etc/php/php.ini``` di 
(consiglio di usare ```sudo gedit /etc/php/php.ini```) per potter usare mysql in php
```
extension=pdo_mysql
extension=mysqli
```
## for ubuntu

```
sudo apt install php7.3-mysql mariadb-server
sudo pip3 install pymysql
```
# Creare il db per pokemon

Connettersi my sql con ```sudo mysql -u root -p``` e creare il db pokemon_fansite e il utente monty con password python 

```sql
 CREATE DATABASE pokemon_fansite;
 CREATE USER 'monty'@'localhost' IDENTIFIED BY 'python';
 GRANT ALL PRIVILEGES ON *.* TO 'monty'@'localhost';
 FLUSH PRIVILEGES;
 quit
```
