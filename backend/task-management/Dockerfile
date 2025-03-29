# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set working directory inside container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the source code into the container
COPY . .

# Step 6: Compile TypeScript to JavaScript
RUN npm run build

# Step 7: Expose port 8080 (default for Cloud Run)
EXPOSE 8080

# Step 8: Start the server using compiled JavaScript
CMD ["npm", "start"]
