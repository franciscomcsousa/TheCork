# Backend Guide

- Backend's framework is [**Flask**](https://flask.palletsprojects.com/en/2.2.x/)

- Web server is [**Nginx**](https://www.nginx.com/)

- This project is being deployed using [**Guinicorn**](https://gunicorn.org/)

- Database system is [**MySQL**](https://www.mysql.com/)

## Scheme of the network

![image info](/NetworkSecurity/Server/images/network.png)

## VM2 - Firewall

#### Network manager
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

#### ipables

- Back ofice connects to the firewall instead of directly to the database, because of this the firewall needs prerouting and forward configurations
```
iptables -I PREROUTING -t nat -i enp0s8 -p tcp --dport 3306 -j DNAT --to 192.168.11.1:3306
iptables -I FORWARD -p tcp -i enp0s8 -o enp0s9 -d 192.168.11.1 --dport 3306 -j ACCEPT
```

- Basically redirecting http requests from the server to the firewall
```
iptables -t nat -I PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.10.1:80
iptables -t nat -I POSTROUTING -p tcp -d 192.168.10.1 --dport 80 -j SNAT --to-source 192.168.20.1
```

- TODO - easier to provide the file with the iptables rules

#### ufw

- Still trying to figure out if this is needed (the default config from ufw seems good to block most conections)

## VM3 - Server

#### Network manager
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

#### Running nginx

- Start by installing [**Nginx**](https://www.nginx.com/)

- Change the default file to the following one:

```
$ cat vim /etc/nginx/sites-enabled/sirs_project
server {
    listen 80;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

- Test the server by deploying with [**Flask's**](https://flask.palletsprojects.com/en/2.2.x/) development mode
`python3 app.py`

- **Note** - Don't forget to install the requirements to run the app 
`pip install -r requirements.txt`

- The server must be deployed with [**guinicorn**](https://gunicorn.org/), to do this, just make sure you're inside the app directory and run
`guinicorn --workers=3 app:app`

## VM4 - Database

#### Network manager
```
### On VM4
$ sudo cat /etc/netplan/01-network-manager-all.yaml
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

#### Running MySQL

- [**MySQL**](https://www.mysql.com/) should run as a service, after adding it to the services of the operating system, it automatically runs on start up

- After creating a proper user and password, the database (named `thecork`) is populated using
`mysql thecork < schema.sql`