# Build stage - handles OpenNext transformation
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY . .

# Install all dependencies (including dev dependencies for OpenNext)
RUN npm ci

# Build NextJS app first
RUN npm run build

# Install OpenNext and transform the build
RUN npx @opennextjs/aws@latest build

# Production stage - minimal runtime
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the OpenNext build output
COPY --from=builder /app/.open-next ./

# Copy package.json for any runtime dependencies
COPY --from=builder /app/package*.json ./

# Install only production dependencies (if any are needed by OpenNext output)
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000

# Run the OpenNext server function
CMD ["node", "server-function/default/index.mjs"]