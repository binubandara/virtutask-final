# Use Node.js as the base image
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Compile TypeScript code
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/server.js"]
