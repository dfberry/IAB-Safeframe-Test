
#  $ docker build -t sf-host .
#  $ docker run -it -p 8010:8010 -v /Users/dfberry/repos/IAB/:/home/nodejs/safeframe sf-host 


#tail -f /dev/null 
# base image 
FROM node:latest

RUN mkdir -p /home/nodejs/safeframe && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs nodejs && \
    chown -R nodejs:nodejs /home/nodejs

RUN apt-get update
RUN apt-get install nano
RUN npm install -g lite-server

WORKDIR /home/nodejs/safeframe/

USER nodejs

CMD lite-server -c ./liteserver.config.js