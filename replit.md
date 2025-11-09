# Project Overview

This is a full-stack web application built with React, Express, and PostgreSQL. It features a user authentication system with a login/registration form interface. The application uses a modern tech stack with TypeScript, Vite for frontend bundling, and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- Single Page Application (SPA) architecture

**UI Component System**
- Shadcn UI component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Material Design-inspired approach focusing on clarity and accessibility
- Custom CSS variables for theming (light mode configured)
- Inter/Roboto font families for typography

**State Management & Data Fetching**
- TanStack React Query (v5) for server state management
- React Hook Form with Zod validation for form handling
- Custom query client with fetch-based API requests

**Form Validation Strategy**
- Zod schemas shared between frontend and backend for consistent validation
- Schema definitions in shared directory for type safety across the stack
- Hookform Resolvers for integrating Zod with React Hook Form

### Backend Architecture

**Server Framework**
- Express.js for REST API endpoints
- TypeScript with ESM module system
- Node.js runtime

**Database Layer**
- PostgreSQL database via Neon serverless driver
- Drizzle ORM for type-safe database queries and migrations
- Schema-first approach with Drizzle Kit for migrations
- Database schema defined in shared directory for frontend/backend consistency

**Authentication & Security**
- Bcrypt for password hashing (10 salt rounds)
- User registration endpoint with duplicate username prevention
- Passwords excluded from API responses for security

**API Design**
- RESTful endpoints under `/api` prefix
- JSON request/response format
- Structured error handling with appropriate HTTP status codes
- Request logging middleware for development monitoring

**Development Setup**
- Separate development and production modes
- Custom Vite middleware integration for SSR in development
- Static file serving in production
- TypeScript compilation with tsx for development, esbuild for production builds

### Project Structure

**Monorepo Layout**
- `/client` - Frontend React application
- `/server` - Backend Express application  
- `/shared` - Shared TypeScript types and schemas
- Path aliases configured: `@/` for client source, `@shared/` for shared code

**Build & Deployment**
- Development: Concurrent Vite dev server with Express backend
- Production: Vite builds static assets, esbuild bundles backend
- Output: `/dist/public` for frontend, `/dist` for backend

### Data Model

**Users Table**
- `id` (varchar, primary key, UUID auto-generated)
- `username` (text, unique, not null)
- `password` (text, not null, bcrypt hashed)

**Storage Layer**
- Abstract IStorage interface for database operations
- DatabaseStorage implementation using Drizzle ORM
- Methods: getUser, getUserByUsername, createUser

## External Dependencies

### Third-Party Services
- **Neon Database** - Serverless PostgreSQL hosting (connection via DATABASE_URL environment variable)
- **Google Fonts** - Inter font family for typography

### Key NPM Packages

**Frontend**
- `react` & `react-dom` - UI framework
- `@tanstack/react-query` - Server state management
- `wouter` - Routing
- `react-hook-form` - Form handling
- `zod` & `@hookform/resolvers` - Schema validation
- `@radix-ui/*` - Headless UI components (20+ packages)
- `tailwindcss` - CSS framework
- `lucide-react` - Icon library

**Backend**
- `express` - Web framework
- `drizzle-orm` & `drizzle-kit` - ORM and migrations
- `@neondatabase/serverless` - Database driver with WebSocket support
- `bcrypt` - Password hashing
- `ws` - WebSocket library for Neon connection

**Build Tools**
- `vite` & `@vitejs/plugin-react` - Frontend bundling
- `esbuild` - Backend bundling
- `tsx` - TypeScript execution for development
- `typescript` - Type checking

**Development**
- `@replit/vite-plugin-*` - Replit-specific development tools (cartographer, dev-banner, runtime-error-modal)

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string (required, throws error if missing)
- `NODE_ENV` - Environment mode (development/production)