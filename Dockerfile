# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Remove package managers the standalone server doesn't need, so a compromised
# process can't use them to pull in tooling.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /opt/yarn* \
    /usr/local/bin/yarn /usr/local/bin/yarnpkg

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 -G nodejs nextjs

# Copy built application. Files stay root-owned so the runtime user can't
# modify the server code; only the Next.js cache dir is writable.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache

USER nextjs

EXPOSE 3000

ENV PORT=3000
# next js bind on all interfaces
ENV HOSTNAME=0.0.0.0

# Start the Next.js application
CMD ["node", "server.js"]
