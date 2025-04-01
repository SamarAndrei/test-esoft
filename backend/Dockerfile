FROM node:20.18.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm i -g knex

COPY ./build ./build

WORKDIR /app/build

CMD npm run migrate:build && npm run seed:build && npm run start
