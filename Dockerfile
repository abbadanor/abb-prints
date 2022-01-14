FROM node:12.16.3-alpine3.9

RUN mkdir -p /var/www/dockerize-printers/printers-app
WORKDIR /var/www/dockerize-printers/printers-app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=4000

CMD [ "npm", "start" ]