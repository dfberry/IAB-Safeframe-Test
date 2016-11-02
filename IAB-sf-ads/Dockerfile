#  Safe-frame test for ads
#
#
#  $ docker build -t sf-ads .
#  $ docker run -h sfads -it -p 8020:8020 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test sf-ads 
#  $ docker run -d -p 8020:8020 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test --name ads sf-ads-network tail -f /dev/null
#  $ docker-compose docker run -d -p 8020:8020 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test --name ads sf-ads-network tail -f /dev/null


# Git hub: https://github.com/dfberry/IAB-Safeframe-Test

# base image 
FROM node:latest

RUN mkdir -p /home/nodejs/IAB-Safeframe-Test/IAB-sf-ads && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs nodejs && \
    chown -R nodejs:nodejs /home/nodejs

#install repo https://github.com/dfberry/IAB-Safeframe-Test
RUN npm install lite-server -g

WORKDIR /home/nodejs/IAB-Safeframe-Test
USER nodejs
CMD tail -f /dev/null 