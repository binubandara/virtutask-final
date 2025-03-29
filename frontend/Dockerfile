# Use official Node.js image from Docker Hub
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Install development dependencies (for build step)
RUN npm install --only=development

# Copy the rest of the application
COPY . .

# Build the app using Vite
RUN npm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose port 8080
EXPOSE 8080

# Run the application with serve
CMD ["serve", "-s", "dist", "-l", "8080"]
