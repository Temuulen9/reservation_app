# Use official Node.js image as base
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

ENV PORT=3000

# Build the app
RUN npm run build

# Set environment variables
# ENV NODE_ENV=production

# Expose the port your NestJS app uses (usually 3000)
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
