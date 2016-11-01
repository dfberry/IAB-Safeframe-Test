# Static server for /public dir 
Serves all static files from ./public or below

## Config file
The configuration file is expected to be at the root and named config.json

`
{
    "port": 8090,
    "default": "/public/default.html"
}
`

If the default file can be found, then it is served for root requests. 

## Not implemented here but expected at Proxy-level only
Caching and compression are not implemented because they can be implemented at the proxy level. Restarting app is expected from pm2 or the like. 

### Nginx information for caching:
https://serversforhackers.com/nginx-caching

### Nginx information for compression:
http://nginx.org/en/docs/http/ngx_http_gzip_module.html