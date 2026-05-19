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

Large source files are intentionally not tracked in git. Keep editable/source assets locally in:

- `Primary Logos/`
- `One-pagers/`

Optimized runtime logo files needed by the deployed frontend are tracked in `frontend/public/brand/`.

## Static Preview Deployment

The frontend can be deployed without the backend for colleague review. In static preview mode the demo form still validates, but it does not submit to MySQL.

### GitHub Pages

The workflow in `.github/workflows/deploy-frontend-pages.yml` builds only the frontend and publishes `frontend/dist`.

The published build uses a relative asset base, so it works as a static project page without any additional path configuration. Demo form submissions run in static preview mode on Pages and validate locally instead of calling the backend.

Expected Pages URL after the workflow runs:

```text
https://saadz-khan.github.io/innobridge-webpage/
```

In GitHub, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Then push `main` or `smartconveyance-enhanced-implementation`, or run the workflow manually.

If GitHub Pages shows the repository README instead of the site, it usually means Pages is still configured for branch-based publishing. Switch the source to **GitHub Actions** and disable any old branch/folder publish setting.

This repository is currently a Vite/React app, not a Next.js app. If you plan to deploy a separate Next.js site, it needs its own Next.js build setup and deployment strategy.

### Netlify

The `netlify.toml` file is configured for a free Netlify static deploy. Connect the GitHub repository in Netlify and use the default settings from the file.

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
