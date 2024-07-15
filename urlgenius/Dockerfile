# pull official base image
FROM node:22-bullseye-slim

# set work directory
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g serve
RUN npm install

# copy react project
COPY . .

# build react project
RUN npm run build