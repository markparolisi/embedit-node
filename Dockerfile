FROM node:7.10.1

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

EXPOSE  8080

CMD ["npm", "start"]