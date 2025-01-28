FROM node:16-alpine

WORKDIR /parco

RUN apk add --no-cache python3 make g++ git

RUN npm config set python python3
RUN npm config set arch arm64
RUN npm config set platform linux

COPY package*.json ./
RUN npm install -g node-gyp
RUN npm install -g bcrypt
RUN npm ci
RUN npm install bcrypt@latest --save

COPY . .
# Build TypeScript files
RUN npm run tsc

# Start the application using your start script
CMD ["npm", "start"]