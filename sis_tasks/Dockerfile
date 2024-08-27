FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY .env ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

EXPOSE 3005
ENV PORT=3005
ENV HOSTNAME="0.0.0.0"


CMD npx prisma migrate deploy --schema=./prisma/schema.prisma && npm start
