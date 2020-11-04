FROM node:latest

WORKDIR /usr/app

COPY ./package.json .

RUN yarn --production=true install

COPY . /usr/app

CMD [ "yarn", "start:dev" ]