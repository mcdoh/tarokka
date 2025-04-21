FROM node:20-slim

# Create app directory
WORKDIR /tarokka

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
