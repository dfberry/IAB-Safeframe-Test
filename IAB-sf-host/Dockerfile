#  Safe-frame test for ads
#
#
#  $ docker build -t sf-host .
#  $ docker run -h sfhost -it -p 8010:8010 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test sf-host tail -f /dev/null

# Git hub: https://github.com/dfberry/IAB-Safeframe-Test
# tail -f /dev/null

# base image 
FROM node:latest

RUN mkdir -p /home/nodejs/IAB-Safeframe-Test/IAB-sf-host && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs nodejs && \
    chown -R nodejs:nodejs /home/nodejs

#install repo https://github.com/dfberry/IAB-Safeframe-Test
#lite-server // don't need to specify the config file, lite-serve calls it by default
#update
#install nano

WORKDIR /home/nodejs/IAB-Safeframe-Test
USER nodejs
EXPOSE 8010
CMD tail -f /dev/null