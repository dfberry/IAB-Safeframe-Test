#  Safe-frame test for ads
#
#
#  $ docker build -t sf-ads .
#  $ docker run -h sfads -it -p 8020:8020 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test sf-ads 
#  $ docker run -d -p 8020:8020 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test --name ads sf-ads-network tail -f /dev/null
#  $ docker-compose docker run -d -p 8020:8020 -v /Users/dfberry/repos/IAB/IAB-Safeframe-Test:/home/nodejs/container-IAB-Safeframe-Test --name ads sf-ads-network tail -f /dev/null
#  $ docker exec -it [CONTAINER_ID] /bin/bash -c "export TERM=xterm; exec bash"

# Git hub: https://github.com/dfberry/IAB-Safeframe-Test



# base image 
FROM node:latest

RUN mkdir -p /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs nodejs && \
    chown -R nodejs:nodejs /home/nodejs

# add text editor
ENV TERM xterm
RUN apt-get update
RUN apt-get install nano


# add static server
RUN npm install lite-server -g

# add repository
WORKDIR /home/nodejs
RUN git clone https://github.com/dfberry/IAB-Safeframe-Test.git

WORKDIR /home/nodejs/IAB-Safeframe-Test/IAB-sf-ads
USER nodejs

# export port used by safeframe hosting website
EXPOSE 8020

# make sure primary pid isn't tied to website so container will stay up
CMD tail -f /dev/null
#CMD lite-server

