FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm i
COPY . .
EXPOSE 8080 
CMD [ "npm","run","start" ]
