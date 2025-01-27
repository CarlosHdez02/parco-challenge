FROM node:lts-alpine

WORKDIR /parco

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]