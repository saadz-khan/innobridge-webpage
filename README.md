# Innobridge SmartConveyance Web

Standalone production-quality one-page web app for SmartConveyance by Innobridge.

## Stack

- Frontend: Vite, React, TypeScript, custom CSS design tokens
- Backend: Fastify, TypeScript, Zod validation
- Runtime: Separate frontend and backend containers with Docker Compose

## Local Development

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
docker compose up --build
```

The production-style app runs at `http://localhost:8080`.

## API

- `GET /api/health`
- `POST /api/demo-requests`

Demo requests are validated and appended to a JSONL file. Configure the path with `DEMO_REQUEST_LOG_PATH`.
