FROM node:16

WORKDIR /usr/app

COPY package.json /usr/app/

RUN npm install

COPY . .

CMD [ "npm", "start" ]