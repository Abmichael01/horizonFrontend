# ------------------------------------------------------------------------------
#  Horizon Frontend – Production Dockerfile (Dokploy)
# ------------------------------------------------------------------------------

# -- Stage 1: Build --
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Build Arguments for Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the project
RUN pnpm build

# -- Stage 2: Serving --
FROM node:20-alpine

WORKDIR /app

# Install a simple static server
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port (Dokploy will map this via Traefik)
EXPOSE 3000

# Start serving
CMD ["serve", "-s", "dist", "-l", "3000"]
