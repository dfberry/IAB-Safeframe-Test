#Usage

Bring up 4 containers. nginx, ads, host, and whoami.
I probably don't need nginx or whoami -- seems like 2 containers found each other.
Host container exposes 8010 for website. Ads container exposes 8020 for ads.

docker-compose build --no-cache

docker-compose up --no-recreate 

Once the containers are up, the web servers are not running yet. Log into the both containers
and run lite-server. 

The -c export statement below is so I can use nano to edit files -- if I need to. 

docker exec -it -u root <containerid> /bin/bash -c "export TERM=xterm; exec bash"

When you are on each system, find the directory that has the bs-config.js file. Start 
the web service via 'lite-server' which was installed as part of the build. 

If you use 
the -it then you can see the file requests and the stop/restart on file changes.

The host web site has the host files as well as the /src/js/host/host.js. All the other src
files are hosted from the ads container. I'm not sure if this is the 'right way' to host
the files but the ads respond correctly this way.  

The host web site is 
http://localhost:8010/website/

The ads web site is 
http://localhost:8020/ads/

The src version is from the vnext-layer-bg branch
https://github.com/InteractiveAdvertisingBureau/safeframe/blob/vnext-layer-bg

PostMessage
The code base also hosts a simple example of postMessage, without IAB safeframe code.

http://localhost:8010/website/postMessageController.html

The blog post explaining postMessage is on teamtreehouse.
http://blog.teamtreehouse.com/cross-domain-messaging-with-postmessage
http://caniuse.com/#feat=x-doc-messaging

code pen demo - http://codepen.io/matt-west/full/lpExI
view code on code pen - http://codepen.io/matt-west/pen/lpExI
download code - http://cl.ly/3M1x3T1M0X2C

The repo for their code is
https://github.com/dfberry/IAB-Safeframe-Test
