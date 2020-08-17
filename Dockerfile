FROM node:12.13.0

# WORKDIR /usr/src/app

LABEL maintainer="Raghuram Kumar <raghuk46@gmail.com>"

USER root

ENV HOME=/home/node

RUN mkdir -p $HOME/app

RUN chown -R $USER:$USER $HOME/*

WORKDIR $HOME/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 5000

CMD ["yarn", "start"]
