> docker-compose build
> docker-compose up

8010 = host site - site runs with or without ads, site links to ad server
8020 = ad server - site returns ads only


safe-frame needs the system to start no in the website or ads dir but 1 dir up so make sure
to request into ads or website to get correct files


http://localhost:8010/website/pushdown_sample.html
http://localhost:8020/ads/index.html

https://github.com/InteractiveAdvertisingBureau/safeframe/blob/vnext-layer-bg


via docker-nginx routing
http://host.localhost:8010/website/
host website keeps ads website url name in the /website/safeframe-test.js