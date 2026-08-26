# Job Tracker

A modern SaaS-style job application tracker built as a full-stack web application.

The project is split into two layers:

- `frontend/` — React + Vite SPA with client-side routing, authentication state, and dashboard UX.
- `backend/` — Express + TypeScript API with Prisma + PostgreSQL, JWT auth, input validation, and repository/service layering.

## 🚀 Overview

Job Tracker is designed for users to sign in, manage job applications, and track recruiting status in a secure, production-grade SaaS architecture.

Key capabilities:

- User signup, login, logout
- User-specific job application management
- CRUD API for applications
- Authentication via JWT cookie
- Form validation using Zod
- Clean backend separation: routes, controllers, services, repositories
- Frontend routing, protected routes, and route-level data loading
- Zustand-based authentication state with session restoration through `/auth/me`
- Light and dark color modes with Chakra UI
- Docker Compose configuration for the frontend and backend services

## 🏗 Architecture

### Frontend

The frontend lives in `frontend/` and is implemented as a single-page application.

Core architecture:

- `React 19` for declarative UI
- `Vite` for development and production bundling
- `Chakra UI` for component-based styling and design system primitives
- `next-themes` for light/dark color-mode support
- `React Router v7` for page routing and protected route flows
- `Zustand` store for auth state, login/logout, and session checks
- Route loaders for data fetching before page render

Responsibilities:

- Render the public Home page, auth screens, dashboard, applications list, application detail, and board views
- Manage auth state and session restoration through the Zustand store
- Call backend REST API endpoints using credentialed fetch requests
- Keep frontend routing independent from API implementation details

### Backend

The backend lives in `backend/` and exposes a REST API under `/api/v1`.

Core architecture:

- `Express 5` application server
- `TypeScript` for typed backend logic
- `Prisma` ORM for typed database access
- `PostgreSQL` as the relational datastore
- `Zod` for request validation and schema parsing
- `bcrypt` for password hashing
- `jsonwebtoken` for JWT authentication

Layered structure:

- `routes/` defines API endpoints and route composition
- `controllers/` contain request handling, responses, and error handling
- `services/` contain business logic and use case orchestration
- `repository/` provides a data access abstraction over Prisma
- `middlewares/` enforce authentication and request policies

This separation makes the backend maintainable, testable, and ready for enterprise SaaS extension.

### Database

The data layer uses Prisma with PostgreSQL.

Model design:

- `User` model stores user credentials and relationships
- `Application` model stores job application details
- `ApplicationStatus` enum tracks lifecycle states
- `ApplicationLocation` enum stores location type

The backend is user-scoped: every application belongs to a specific user, which supports multi-user SaaS access control.

## 🧩 Tech Stack by Layer

### Frontend

- `react` — component-driven UI
- `react-dom` — DOM rendering
- `react-router` — client-side page routing
- `vite` — fast build/dev tooling
- `@chakra-ui/react` — component library and styled UI primitives
- `@emotion/react` — styling engine used by Chakra
- `next-themes` — dark/light color-mode theming
- `lucide-react` — icon system

### Backend

- `express` — HTTP server framework
- `dotenv` — environment variable loading
- `cookie-parser` — cookie reading for auth
- `cors` — cross-origin request handling
- `jsonwebtoken` — JWT creation and validation
- `bcrypt` — password hashing
- `zod` — validation and schema parsing
- `prisma` / `@prisma/client` — typed database ORM
- `tsx` — TypeScript runtime for local development

### Database

- `PostgreSQL` — production-grade relational database
- `Prisma Migrate` — schema migrations and evolution

## 🔒 Security and SaaS Readiness

This project is built with production-ready security patterns:

- `bcrypt` for secure password storage
- `JWT` tokens stored in `httpOnly` cookies
- `secure` cookies in production mode
- `sameSite: lax` cookie policy
- `CORS` configured for the frontend origin
- `Zod` input validation for all request payloads
- Per-user data isolation in database queries

## 📁 Project Structure

Root directories:

- `frontend/` — React app source code
- `backend/` — Express API source code

Backend structure:

- `server.ts` — entrypoint and middleware bootstrapping
- `routes/` — route definitions and router wiring
- `controllers/` — request/response handling
- `services/` — business logic layer
- `repository/` — data access layer, Prisma abstraction
- `schemas/` — Zod schemas for validation
- `middlewares/` — auth and request policies
- `config/` — Prisma and environment configuration

Frontend structure:

- `src/App.tsx` — router setup and application skeleton
- `src/api/` — API helpers such as the current-user request
- `src/components/` — shared UI and application dialogs
- `src/layouts/Auth.tsx` — protected-route layout and redirect handling
- `src/loaders/` — route data loaders for applications
- `src/pages/` — Home, auth, dashboard, application, and board views
- `src/store/authStore.ts` — Zustand authentication state
- `src/config/url.ts` — backend API path configuration

## ⚙️ Getting Started

### Backend

1. Copy `.env` and configure database/secret values.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Run Prisma migrations:
   ```bash
   npm run prisma:migrate
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```

### Docker Compose

The repository includes Dockerfiles for both services and a Compose configuration for local containerized development:

```bash
docker compose up --build
```

The frontend is available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## 🧪 Production Build

### Backend

```bash
cd backend
npm run build
NODE_ENV=production node dist/server.js
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## ☁️ Deployment Notes

For SaaS deployment, deploy the frontend and backend separately or behind a reverse proxy.

- Frontend can be hosted as a static site on Vercel, Netlify, or any CDN-backed host.
- Backend can be deployed on Node-friendly hosts such as AWS ECS, Fly.io, Railway, Render, or DigitalOcean App Platform.
- PostgreSQL should be provisioned using managed database services.
- Use environment variables for `DATABASE_URL`, `JWT_SECRET`, and `NODE_ENV`.
- Configure `CORS` origin in production to the deployed SPA domain.
- Enable TLS/HTTPS for cookies and API transport.

## 📌 Useful Scripts

### Backend

- `npm run dev` — start backend in watch mode
- `npm run build` — compile TypeScript
- `npm run start` — run compiled backend
- `npm run prisma:migrate` — run Prisma migrations
- `npm run prisma:studio` — open Prisma Studio

### Frontend

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview built site
- `npm run lint` — run ESLint
