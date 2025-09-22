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

Complete healthcare management system following Clinia API specifications:

### Core Models
- **Location**: Hospital/clinic locations with address and geo data
- **HealthInsurance**: Health insurance providers (convênios)
- **Plan**: Specific health insurance plans
- **Specialty**: Medical specialties
- **Service**: Consultations, exams, and procedures
- **Professional**: Doctors and healthcare professionals
- **Client**: Patients with contact information
- **Appointment**: Scheduled appointments with all relationships
- **AvailableSlot**: Available time slots for scheduling

### Relationships
- **Professional ↔ Specialty**: Many-to-many via `ProfessionalSpecialty`
- **Client ↔ Phone**: One-to-many via `ClientPhone`
- **All entities** connect to `Appointment` for complete scheduling context

### Key Features
- **nanoid()** for primary keys across all models
- **Decimal** type for coordinates and prices
- **DateTime** for proper date/time handling
- **Enum** for appointment states (WAITING, CONFIRMED, REJECTED, SHOW, NO_SHOW)
- **Cascade deletion** for junction tables

### Seed Data
The seed file (`prisma/seed.ts`) creates a complete test dataset:
- **1 Location**: "Hospital da Visão - Unidade Principal" in Goiânia/GO
- **2 Health Insurances**: Unimed and Particular
- **2 Plans**: Unimed Individual and Particular
- **3 Specialties**: Oftalmologia, Cirurgia Refrativa, Retina e Vítreo
- **2 Services**: Consulta Oftalmológica and Cirurgia de Catarata
- **2 Professionals**: Dr. Carlos Silva and Dra. Ana Santos
- **1 Client**: João Silva with phone number
- **Professional-Specialty relationships** and **Available slots**

## API Endpoints

Complete REST API following Clinia specifications with all required endpoints:

### Locations (/locations)
- `GET /locations` - List all locations with optional filters
  - Query params: `service`, `professional`, `specialty`, `client`
- `GET /locations/:id` - Get specific location by ID

### Health Insurances (/health-insurances)
- `GET /health-insurances` - List all health insurances with optional filters
  - Query params: `service`, `location`, `professional`
- `GET /health-insurances/:id` - Get specific health insurance by ID

### Plans (/plans)
- `GET /plans` - List all plans with optional filters
  - Query params: `healthInsurance`, `location`, `professional`

### Specialties (/specialties)
- `GET /specialties` - List all specialties with optional filters
  - Query params: `healthInsurance`, `location`, `plan`, `professional`
- `GET /specialties/:id` - Get specific specialty by ID

### Services (/services)
- `GET /services` - List all services with optional filters
  - Query params: `location`, `professional`, `healthInsurance`, `specialty`, `plan`, `client`, `enabled`
- `GET /services/:id` - Get specific service by ID

### Professionals (/professionals)
- `GET /professionals` - List all professionals with optional filters
  - Query params: `location`, `service`, `healthInsurance`, `specialty`, `enabled`
- `GET /professionals/:id` - Get specific professional by ID

### Clients (/clients)
- `GET /clients` - List all clients with pagination
  - Query params: `limit`, `offset`
- `GET /clients/search` - Search clients by term
  - Query params: `term`, `limit`, `offset`
- `GET /clients/:id` - Get specific client by ID
- `POST /clients` - Create new client
- `PATCH /clients/:id` - Update client

### Schedule (/schedule)
- `GET /schedule` - Get available time slots
  - Query params: `start`, `end`, `professional`, `service`, `location`, `healthInsurance`, `specialty`, `client`, `plan`

### Appointments (/appointments)
- `GET /appointments` - List all appointments with optional filters
  - Query params: `start`, `end`, `location`, `service`, `professional`, `client`, `state`, `minimal`
- `GET /appointments/:id` - Get specific appointment by ID
- `POST /appointments` - Create new appointment
- `PATCH /appointments/:id/state` - Update appointment state
- `PATCH /appointments/:id/time` - Update appointment date/time

### Features
- **Advanced filtering** on all list endpoints
- **Pagination support** where applicable
- **Full relationships** included in responses
- **Type validation** using Elysia's built-in validation
- **Error handling** with proper HTTP status codes
- **Minimal mode** for performance on large datasets

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