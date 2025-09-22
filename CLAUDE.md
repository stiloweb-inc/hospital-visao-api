# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hospital vision API built with **Elysia** (a Bun-native web framework) and **Bun** runtime. The project includes **Prisma** as the ORM with **PostgreSQL** database support and **Biome** for code formatting and linting.

## Architecture

- **Runtime**: Bun (JavaScript runtime, package manager, bundler, and test runner)
- **Framework**: Elysia (lightweight, fast web framework for Bun)
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript with strict type checking enabled
- **Module System**: ES2022 modules with Node.js resolution
- **Entry Point**: `src/index.ts`
- **Code Quality**: Biome for linting and formatting

## Development Commands

### Primary Development
```bash
bun run dev        # Start development server with file watching
```

### Package Management
```bash
bun install        # Install dependencies
bun add <package>  # Add a dependency
bun remove <package> # Remove a dependency
bun update <package> # Update a dependency
bun outdated       # Display latest versions of outdated dependencies
```

### Database Operations
```bash
bunx prisma generate    # Generate Prisma client
bunx prisma db push     # Push schema changes to database
bunx prisma db pull     # Pull schema from database
bunx prisma migrate dev # Create and apply migration
bunx prisma studio     # Open Prisma Studio
bun run db:seed        # Run database seed
bun run db:reset       # Reset database and seed
bunx prisma db seed    # Run seed using Prisma (alternative)
```

### Code Quality
```bash
bunx biome check       # Run linter and formatter checks
bunx biome check --fix # Fix auto-fixable issues
bunx biome format      # Format code
bunx biome lint        # Run linter only
```

### Testing & Code Quality
```bash
bun test          # Run unit tests (currently not configured)
```

### Production & Deployment
```bash
bun run build     # Generate Prisma client for production
bun run start     # Start production server
bun run deploy    # Deploy with migrations (used by Render)
```

### Docker Operations
```bash
docker build -t hospital-visao-api .    # Build Docker image
docker run -p 3000:3000 hospital-visao-api    # Run container
docker run -p 3000:3000 -e DATABASE_URL="your_db_url" hospital-visao-api    # Run with env vars
```

### Direct Execution
```bash
bun run src/index.ts    # Run the application directly
```

## TypeScript Configuration

- Target: ES2021
- Module: ES2022 with Node.js resolution
- Strict type checking enabled
- Bun types included
- ESModule interop enabled
- Force consistent casing in file names

## Project Structure

```
src/
  index.ts                 # Main application entry point (Elysia server)
prisma/
  schema.prisma           # Database schema definition
  seed.ts                 # Database seed file
  migrations/             # Database migration files
package.json              # Project configuration and dependencies
tsconfig.json             # TypeScript configuration
biome.json                # Biome configuration for linting/formatting
Dockerfile                # Docker configuration for containerization
.dockerignore             # Docker ignore patterns
render.yaml               # Render.com deployment configuration
README.md                 # Basic project documentation
CLAUDE.md                 # This file - guidance for Claude Code
```

## Database Schema

Current models:
- **Location**: Hospital/clinic locations with address and geo data
- **Specialty**: Medical specialties

Database uses nanoid() for primary keys and PostgreSQL as the provider.

### Seed Data
The seed file (`prisma/seed.ts`) creates:
- **1 Location**: "Hospital da Visão - Unidade Principal" in São Paulo/SP
- **2 Specialties**: "Oftalmologia" and "Cirurgia Refrativa"

## Key Dependencies

### Core
- **elysia**: Latest version - Fast web framework for Bun
- **@prisma/client**: ^6.16.2 - Prisma client for database operations
- **prisma**: ^6.16.2 - Prisma CLI and tools

### Development
- **@biomejs/biome**: 2.2.4 - Fast formatter and linter
- **bun-types**: Latest version - TypeScript definitions for Bun APIs

## Development Notes

- The server runs on localhost:3000 by default
- File watching is enabled during development (`bun run dev`)
- Database connection requires `DATABASE_URL` environment variable
- Biome is configured with:
  - Tab indentation
  - Double quotes for JavaScript
  - Recommended linting rules
  - Auto-organize imports
- No testing framework is currently configured

## Deployment (Render.com)

This project is configured for automatic deployment on Render.com using the `render.yaml` file.

### Deployment Steps:

1. **Connect Repository**: Connect your GitHub repository to Render
2. **Automatic Setup**: Render will read `render.yaml` and create:
   - PostgreSQL database (`hospital-visao-db`)
   - Web service (`hospital-visao-api`)
3. **Environment Variables**: Database URL is automatically configured
4. **Deploy**: Push to `main` branch triggers automatic deployment

### Manual Deploy via Render Dashboard:

1. Go to [render.com](https://render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub account
4. Select the `stiloweb-inc/hospital-visao-api` repository
5. Render will automatically detect and use `render.yaml`
6. Click "Apply" to create services

### Configuration Details:
- **Service Type**: Web Service (Docker)
- **Region**: Oregon
- **Plan**: Starter (free tier)
- **Database**: PostgreSQL 15
- **Auto-deploy**: Enabled on main branch
- **Health Check**: GET / endpoint