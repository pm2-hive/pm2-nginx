# pm2-nginx
Nginx module for Keymetrics

![pm2-nginx screenshot](https://raw.githubusercontent.com/pm2-hive/pm2-nginx/master/pm2-nginx.jpg)

## Description

PM2 module to monitor key Nginx server metrics:

* Accepted Connections / Handled Connections / Client Requests 
* Requests per Handled Connections Ratio
* Currently Reading / Writing / Reading Connections


## Requirements

This module requires an Nginx install (tested against v1.8.0).
The ngx_http_stub_status_module needs to be enabled (please refer to this [Tutorial](https://rtcamp.com/tutorials/nginx/status-page/))

## Install

```bash
$ npm install pm2 -g

$ pm2 install pm2-nginx
```

## Config

The default connection details are :   
"protocol" : "http"
"hostname" : "localhost"  
"port" : 80  
"statusPath" : "/nginx_stub_status"  
"username" : "" // No Authentification by default  
"password" : ""
 

To modify the config values you can use the commands:
```bash
$ pm2 set pm2-nginx:protocol https
$ pm2 set pm2-nginx:hostname localhost
$ pm2 set pm2-nginx:port 8080
$ pm2 set pm2-nginx:statusPath "/status"
$ pm2 set pm2-nginx:username "mike"
$ pm2 set pm2-nginx:password "123456"
```

## Uninstall

```bash
$ pm2 uninstall pm2-nginx
```

# License

MIT
