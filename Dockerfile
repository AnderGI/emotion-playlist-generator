FROM node:22-slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install
