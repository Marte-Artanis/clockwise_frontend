# ⏰ Clockwise Frontend

Single-Page Application built with **React**, **Vite**, **TypeScript** and **Tailwind CSS**. Consumers the Clockwise REST API to let users clock in/out and visualise statistics.

## 🚀 Running Locally
```bash
npm install                    # install deps
# create .env with the API URL the SPA should hit
echo "VITE_API_URL=http://localhost:3333" > .env
npm run dev                    # Vite dev server at :5173
```
When the backend runs inside Docker (see parent README), keep `VITE_API_URL=http://localhost:3333`.

## 🏗️ Scripts
| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Vite in development mode (HMR) |
| `npm run build` | Produce production bundle in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run unit tests with Vitest + React Testing Library |
| `npm run lint` | Lint source code |
| `npm run format` | Format code with Prettier |

## 🧪 Automated Tests
* **Vitest** & **@testing-library/react** for unit/UI tests
* Tests are located in `src/__tests__/` and co-located folders.
* `vitest.setup.ts` configures jsdom, React Testing Library and polyfills.

## 📁 Important Folders
| Path | Purpose |
|------|---------|
| `src/components/` | Reusable UI components (Button, Modal, Table, …) |
| `src/pages/` | Route-level pages (Login, Dashboard, History) |
| `src/services/` | API wrappers (auth, clock) |
| `src/contexts/` | React Contexts (AuthContext, …) |

## 🖥️ Production Build via Docker
The `Dockerfile` performs a multi-stage build:
1. Node 18-alpine installs deps and runs `npm run build`.
2. A slim runtime image serves the static bundle with `serve` at port **4173**.

In the provided `clockwise-api/docker-compose.yml`, this image is exposed on host port **5173**.

> Alternatively you can build/run the SPA standalone with: `npm run build && serve -s dist`

## 🔐 Environment Variables
The SPA reads env vars at build time (prefix `VITE_`).
| Key | Purpose | Default |
|-----|---------|---------|
| `VITE_API_URL` | Base URL of Clockwise API | http://localhost:3333 |

## 📂 Folder Structure
```
clockwise-frontend/
├── src/
│   ├── components/   # Reusable UI widgets
│   ├── pages/        # Route-level screens
│   ├── contexts/     # React Context providers
│   ├── services/     # API wrappers (auth, clock)
│   ├── __tests__/    # Vitest test files
│   └── main.tsx      # App entry
└── public/
```

---
Front-end of the Clockwise challenge — crafted with ⚡ by Milena.