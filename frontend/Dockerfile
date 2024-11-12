FROM node:20

WORKDIR /app

RUN rm -rf node_modules
RUN rm -f package-lock.json

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
