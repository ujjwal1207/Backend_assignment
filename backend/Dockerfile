FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

COPY . .

EXPOSE 5000

# Run as non-root user for security
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

CMD ["npm", "start"]
