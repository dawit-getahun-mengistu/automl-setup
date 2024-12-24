# # Use official Node.js image
# FROM node:20

# # Set working directory inside the container
# WORKDIR /usr/src/app

# # Enable corepack (for pnpm)
# RUN corepack enable

# # Copy package manager files
# COPY package.json pnpm-lock.yaml ./

# # Install dependencies using pnpm
# RUN pnpm install --frozen-lockfile

# # Copy the rest of your application
# COPY . .

# # Build the application
# RUN pnpm build

# # Expose the necessary port
# EXPOSE 3000

# # Command to start the application
# CMD ["pnpm", "start"]


# Use official Node.js image
FROM node:20

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package manager files
COPY package.json package-lock.json ./

# Install dependencies using npm
# RUN npm install --production
RUN npm install

# Copy the rest of your application
COPY . .

# Build the application
RUN npm run build

# Expose the necessary port
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
