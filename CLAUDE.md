# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hospital vision API built with **Elysia** (a Bun-native web framework) and **Bun** runtime. The project follows a minimal API structure with TypeScript configuration optimized for modern JavaScript features.

## Architecture

- **Runtime**: Bun (JavaScript runtime, package manager, bundler, and test runner)
- **Framework**: Elysia (lightweight, fast web framework for Bun)
- **Language**: TypeScript with strict type checking enabled
- **Module System**: ES2022 modules with Node.js resolution
- **Entry Point**: `src/index.ts`

The current codebase is minimal with a single endpoint serving "Hello Elysia" at the root path, running on port 3000.

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

### Testing & Code Quality
```bash
bun test          # Run unit tests (currently not configured)
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
  index.ts          # Main application entry point (Elysia server)
package.json        # Project configuration and dependencies
tsconfig.json       # TypeScript configuration
README.md           # Basic project documentation
```

## Key Dependencies

- **elysia**: Latest version - Fast web framework for Bun
- **bun-types**: Latest version - TypeScript definitions for Bun APIs

## Development Notes

- The server runs on localhost:3000 by default
- File watching is enabled during development (`bun run dev`)
- No testing framework is currently configured
- No linting or formatting tools are currently set up