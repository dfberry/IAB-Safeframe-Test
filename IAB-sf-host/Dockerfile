#  Safe-frame test for ads
#
#
#  $ docker build -t sf-host .
#  $ docker run -h sfhost -it -p 8010:8010 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test sf-host tail -f /dev/null

# Git hub: https://github.com/dfberry/IAB-Safeframe-Test
# tail -f /dev/null

# base image 
FROM node:latest

RUN mkdir -p /home/nodejs/ && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs nodejs && \
    chown -R nodejs:nodejs /home/nodejs

RUN apt-get update
RUN apt-get install nano
RUN npm install -g lite-server

WORKDIR /home/nodejs/
RUN git clone https://github.com/dfberry/IAB-Safeframe-Test.git host-IAB-Safeframe-Test

WORKDIR /home/nodejs/host-IAB-Safeframe-Test/IAB-sf-host

USER nodejs

#using bs-config.js to set port to 8010 and server from /ads
#CMD lite-server 