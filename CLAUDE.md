# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend dev server (port 8080)
npm run dev

# Backend API server (port 3001)
npm run dev:server

# Both together
npm run dev:full

# Production build
npm run build

# Lint
npm run lint
```

The frontend proxies `/api/*` requests to the backend at `http://localhost:3001`.

## Architecture

**Stack:** React 18 + TypeScript + Vite (frontend), Node.js HTTP server (backend), Tailwind CSS + shadcn/ui, TanStack Query, React Hook Form + Zod.

**Routing:** Client-side with React Router. Pages live in `src/pages/`. The Vite config and `vercel.json` handle SPA fallback.

**Page structure:** `src/pages/Index.tsx` is the main landing page — it composes section components from `src/components/` in order: Hero → Referentiel → Discover → Growth → Features → Benefits → FAQ → Contact.

**Backend:** `server/index.ts` is a minimal Node.js HTTP server with a single route: `POST /api/contact`. It validates input with Zod, then sends email via the Resend SDK. The `RESEND_API_KEY` env var is required for email to work.

**API also exists at:** `api/contact.ts` — this is a Vercel serverless function that mirrors the same logic for production deployment.

**Design system:** CSS custom properties defined in `src/index.css` using HSL values. Tailwind config extends these via `hsl(var(--...))` references. Key custom utilities: `gradient-primary`, `gradient-hero`, `shadow-elegant`, `shadow-glow`.

**Path alias:** `@` maps to `./src`.

## Key Files

- `src/App.tsx` — router setup
- `src/index.css` — design tokens (colors, gradients, shadows, animations)
- `tailwind.config.ts` — extends design tokens into Tailwind
- `vite.config.ts` — dev proxy and port config
- `vercel.json` — SPA rewrite rules for deployment
- `server/index.ts` — local backend (Zod validation + Resend email)
- `api/contact.ts` — Vercel serverless equivalent

## Language

All UI text is in French. Maintain French for any new user-facing content.
