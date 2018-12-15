FROM node:boron

ENV DEBIAN_FRONTEND noninteractive

# make sure apt is up to date
RUN apt-get update && apt-get upgrade -y

# install
RUN apt-get install -y git openssh-client curl

# update timezone
RUN echo "Asia/Jakarta" | tee /etc/timezone
RUN dpkg-reconfigure --frontend noninteractive tzdata

# install bunyan and grunt
RUN ["npm", "-g", "config", "set", "user", "root"]
RUN ["npm", "install", "grunt-cli", "-g"]
RUN ["npm", "install", "bunyan", "-g"]