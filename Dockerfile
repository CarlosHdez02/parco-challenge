FROM node:lts-alpine

WORKDIR /parco

# Install build dependencies
#RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies with node-gyp
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run tsc

EXPOSE 3000

# Remove build dependencies to reduce image size
#RUN apk del python3 make g++

USER node

CMD ["npm", "start"]