# Use official Node.js image
FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package manager files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy the rest of your application
COPY . .

# Build the application
RUN npm run build

# Expose the necessary port
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:dev"]

# NestJS Dockerfile Optimization
# FROM node:20
# WORKDIR /usr/src/app

# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps

# COPY . .
# RUN npm run build

# EXPOSE 3000
# CMD ["npm", "run", "start:dev"]
