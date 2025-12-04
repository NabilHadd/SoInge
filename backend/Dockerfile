
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine AS production


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist/src ./dist 
COPY --from=builder /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000


CMD ["npm", "run", "start:prod"]