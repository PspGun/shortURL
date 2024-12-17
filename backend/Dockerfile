FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn

# Use apk for Alpine Linux
RUN apk add --no-cache openssl
COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
#RUN apk update && apk add openssl1.1-compat

#RUN npx prisma migrate deploy
#RUN npx prisma migrate status
EXPOSE 8080
CMD [ "npm","run","start" ]