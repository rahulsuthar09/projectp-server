# projectp-server
Node.js backend server

# REDIS
    - start redis on linux before starting server
        use command: 
            redis-server
            check if redis server is connected by:
            redis-cli

# NGINX
    -start nginx if seted up
        sudo systemctl start nginx

# PM2
    1. save pm2 process
        - pm2 save
    2. setup startup for reboot of server
        - pm2 startup systemd       -- result a path, run that path with sudo
