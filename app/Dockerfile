# official Node.js 20 
FROM node:20

WORKDIR /app

COPY package.json

RUN npm install

COPY . .

CMD ["node", "app.js"]
