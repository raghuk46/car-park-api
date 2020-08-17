FROM node:12.13.0

WORKDIR /usr/src/app

LABEL maintainer="Raghuram Kumar <raghuk46@gmail.com>"

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# setup enviroment arguments
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
