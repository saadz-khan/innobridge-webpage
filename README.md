# SmartSuite SmartConveyance Web

Standalone production-quality one-page web app for SmartConveyance by Innobridge.

## Stack

- Frontend: Vite, React, TypeScript, custom CSS design tokens
- Backend: Fastify, TypeScript, Zod validation, MySQL persistence
- Runtime: Separate frontend, backend, and database containers with Docker Compose

## Local Development

Recommended local checkout:

```bash
mkdir -p ~/Desktop/Dev
cd ~/Desktop/Dev
```

```bash
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies `/api` to the backend at `http://localhost:4000`.

## Brand Assets

Large source assets and logo files are intentionally not tracked in git. Keep them locally in:

- `Primary Logos/`
- `One-pagers/`
- `frontend/public/brand/`

The frontend expects the runtime logo files in `frontend/public/brand/` when previewing or building the site.

## Docker

```bash
cp .env.example .env
npm run docker:up
```

The production-style app runs at `http://localhost:8080`.

If ports `8080`, `4000`, or `3307` are already taken, override them when starting the stack:

```bash
FRONTEND_PORT=8081 BACKEND_PORT=4100 MYSQL_HOST_PORT=3308 CORS_ORIGIN=http://localhost:8081 npm run docker:up
```

Docker Compose runs the stack as:

- `SmartSuiteFrontend`
- `SmartSuiteBackend`
- `SmartSuiteDatabase`
- `SmartSuiteNetwork`
- `SmartSuiteDatabaseData`

## API

- `GET /api/health`
- `POST /api/demo-requests`

Demo requests are validated and saved to MySQL in the `demo_requests` table. The backend creates the table on startup when it does not exist.
