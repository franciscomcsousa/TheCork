# Backend Guide

## Table of contents
1. [Project Overview](#project-overview)
2. [Scheme of the network](#scheme-of-the-network)
3. [VM1 - Internal Client](#vm1---internal-client)
    1. [Network manager](#network-manager-vm1) 
4. [VM2 - Firewall](#vm2---firewall)
    1. [Network manager](#network-manager-vm2)
    2. [iptables](#iptables)
    3. [ufw](#ufw)
5. [VM3 - Server](#vm3---server)
    1. [Network manager](#network-manager-vm3)
    2. [Running nginx](#running-nginx)
    3. [Deploying the backend](#deploying-the-backend)
6. [VM4 - Database](#vm4---database)
    1. [Network manager](#network-manager-vm4)
    2. [Running mariadb](#running-mariadb)

## Project Overview

- Backend's framework is [**Flask**](https://flask.palletsprojects.com/en/2.2.x/)

- Web server is [**Nginx**](https://www.nginx.com/)

- This project is being deployed using [**Guinicorn**](https://gunicorn.org/)

- Database system is [**MariaDB**](https://mariadb.org/)

## Scheme of the network

![image info](/backend/images/network.png)

## VM1 - Internal Client

### Network manager (VM1)

```
### On VM1
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:    # or enp0s8, if you have it enabled instead
          addresses:
              - 192.168.20.100/24
          routes:
              - to: 0.0.0.0/0
                via: 192.168.20.254
          nameservers:
              addresses: [8.8.8.8, 8.8.4.4]
```

- **Note** - after changing the `network-manager`, netplan must be reapplied
```
sudo netplan try
sudo netplan apply
```

## VM2 - Firewall

### Network manager (VM2)
```
$ sudo cat /etc/netplan/01-network-manager-all.yaml
### On VM2
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:
          addresses:
              - 192.168.20.1/24
          nameservers:
              addresses: [8.8.8.8, 8.8.4.4]
      enp0s8:
          addresses:
              - 192.168.10.254/24
          nameservers:
              addresses: [8.8.8.8, 8.8.4.4]
      enp0s9:
          addresses:
              - 192.168.11.254/24
          nameservers:
              addresses: [8.8.8.8, 8.8.4.4]
      enp0s10:
          dhcp4: true
```

- **Note** - after changing the `network-manager`, netplan must be reapplied
```
sudo netplan try
sudo netplan apply
```

### iptables

- Backend connects to the firewall instead of directly to the database, because of this the firewall needs prerouting and forward configurations
```
iptables -I PREROUTING -t nat -i enp0s8 -p tcp --dport 3306 -j DNAT --to 192.168.11.1:3306
iptables -I FORWARD -p tcp -i enp0s8 -o enp0s9 -d 192.168.11.1 --dport 3306 -j ACCEPT
```

- Basically redirecting http requests from the server to the firewall
```
iptables -t nat -I PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.10.1:80
iptables -t nat -I POSTROUTING -p tcp -d 192.168.10.1 --dport 80 -j SNAT --to-source 192.168.20.1
```
- This time allowing https requests (port 443)
```
iptables -t nat -I PREROUTING -p tcp --dport 443 -j DNAT --to-destination 192.168.10.1:443
iptables -t nat -I POSTROUTING -p tcp -d 192.168.10.1 --dport 443 -j SNAT --to-source 192.168.20.1
```
- TODO - easier to provide the file with the iptables rules

### ufw

- All virtual machines will be running ufw `ufw enable` with the following configurations:

- VM2 (Firwall)
```
ufw allow http
ufw allow https
ufw allow 3306
```

- VM3 (Server)
```
ufw allow http
ufw allow https
```

- VM4 (Database)
```
ufw allow 3306
```

## VM3 - Server

### Network manager (VM3)
```
$ sudo cat /etc/netplan/01-network-manager-all.yaml
### On VM3
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:    # or enp0s8, if you have it enabled instead
          addresses:
              - 192.168.10.1/24
          routes:
              - to: 0.0.0.0/0
                via: 192.168.10.254
          nameservers:
              addresses: [8.8.8.8, 8.8.4.4]
```

- **Note** - after changing the `network-manager`, netplan must be reapplied
```
sudo netplan try
sudo netplan apply
```

### Running nginx

- Start by installing [**Nginx**](https://www.nginx.com/)

- Change the default file to the following one
`sudo unlink /etc/nginx/sites-enabled/default`

```
$ cat /etc/nginx/sites-enabled/sirs_project
server {
    listen 80 default_server;
    server_name 192.168.20.1;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name 192.168.20.1;

    ssl_certificate /etc/nginx/ssl/thecork.crt;
    ssl_certificate_key /etc/nginx/ssl/thecork.key;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

- Reload nginx `nginx -s reload`

- Test nginx config file `nginx -t`

- Generating nginx SSL certificates

`sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/thecork.key -out /etc/nginx/ssl/thecork.crt`

### Deploying the backend

- Test the server by deploying with [**Flask's**](https://flask.palletsprojects.com/en/2.2.x/) development mode
`python3 app.py`

- **Note** - Don't forget to install the requirements to run the app 
`pip install -r requirements.txt`

- The server must be deployed with [**guinicorn**](https://gunicorn.org/), to do this, just make sure you're inside the app directory and run
`guinicorn --workers=3 app:app`

## VM4 - Database

### Network manager (VM4)

```
$ sudo cat /etc/netplan/01-network-manager-all.yaml
### On VM4
network:
  version: 2
  renderer: NetworkManager
  ethernets:
      enp0s3:    # or enp0s8, if you have it enabled instead
          addresses:
              - 192.168.11.1/24
          routes:
              - to: 0.0.0.0/0
                via: 192.168.11.254
          nameservers:
              addresses: [8.8.8.8, 8.8.4.4]
```

- **Note** - after changing the `network-manager`, netplan must be reapplied
```
sudo netplan try
sudo netplan apply
```

### Running mariadb

- [**MariaDB**](https://mariadb.org/) should run as a service, after adding it to the services of the operating system, it automatically runs on start up
```
$ sudo systemctl start mariadb
$ sudo systemctl enable mariadb
```

- Set the `bind-address` of `/etc/mysql/mariadb.conf.d/50-server.cnf` to `0.0.0.0`

- After creating a proper user and password, the database (named `thecork`) is populated using
`mariadb thecork < schema.sql`

#### Create certificate for the database (might work for nginx)

- On the SQL server, generate SSL certificates and keys for the certificate authority, server, and client:

- **Note** - these files must be generated in `/etc/mysql/ssl`, other locations might not work and mariadb doesn't know how to properly complaint.

```
mkdir /etc/mysql/ssl
cd /etc/mysql/ssl
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 > ./ca-key.pem
openssl req -new -x509 -nodes -days 365 -key ./ca-key.pem -out ./ca-cert.pem -subj "/C=PT/ST=Portugal/L=Lisbon/O=IST/CN=Group 51 Certification Authority"
openssl req -newkey rsa:4096 -nodes -keyout ./server-key.pem -out ./server-req.pem -subj "/C=PT/ST=Portugal/L=Lisbon/O=IST/CN=thecork.pt"
openssl x509 -req -in ./server-req.pem -days 365 -CA ./ca-cert.pem -CAkey ./ca-key.pem -CAcreateserial -out ./server-cert.pem
openssl req -newkey rsa:4096 -nodes -keyout ./client-key.pem -out ./client-req.pem -subj "/C=PT/ST=Portugal/L=Lisbon/O=IST/CN=thecorkclient.pt"
openssl x509 -req -in ./client-req.pem -days 365 -CA ./ca-cert.pem -CAkey ./ca-key.pem -CAcreateserial -out ./client-cert.pem 
```

- Convert the server's private key to plain RSA format and change its owner to MariaDB's user
```
openssl rsa -in ./server-key.pem -out ./server-key-rsa.pem
chown mysql: ./server-key-rsa.pem 
```

- Change values of `ssl-ca`, `ssl-cert` and `ssl-key` to the right ones in `/etc/mysql/mariadb.conf.d/50-server.cnf`

- Restart mariadb `systemctl restart mariadb`
