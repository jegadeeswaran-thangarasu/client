# Infrastructure Capacity Planning — Client

Enterprise dashboard for visualizing UCS infrastructure inventory and capacity data.

---

## Tech Stack

| Library | Version | Purpose | Why we use it |
|---|---|---|---|
| React | ^18.3.1 | UI runtime | Industry standard; Concurrent Mode for future streaming |
| TypeScript | ^5.6.3 | Language (strict mode) | Catches shape mismatches between raw API data and UI types at compile time |
| Vite | ^6.0.5 | Build tool & dev server | Instant HMR via native ESM; significantly faster than webpack for large TS projects |
| Tailwind CSS | ^3.4.17 | Styling | Utility-first keeps styles co-located with markup; no CSS file sprawl |
| TanStack Query v5 | ^5.62.0 | Server state | Handles caching, deduplication, and background refetching so components don't reinvent `useEffect` + `useState` for every fetch |
| TanStack Table v8 | ^8.20.6 | Table engine | Headless — we own the markup; handles sorting, filtering, and pagination logic without dictating UI |
| Axios | ^1.7.9 | HTTP client | Interceptor API lets us attach auth tokens and handle 401/403/500 globally in one place |
| React Router DOM | ^6.30.3 | Client-side routing | `createBrowserRouter` supports data loaders and nested layouts for future growth |
| lucide-react | ^1.11.0 | Icons | Consistent SVG icon set; tree-shakeable so only used icons ship |

---

## Prerequisites

- **Node ≥ 18** (LTS recommended — Vite 6 drops support for Node 16)
- **npm ≥ 9** (ships with Node 18)
- No required global installs — everything runs through `npm run`

Check your versions:

```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd cigna-presidio

# 2. Move into the client workspace
cd client

# 3. Install dependencies
npm install

# 4. Create your local environment file
cp .env.example .env.local

# 5. Set the API base URL in .env.local
#    For development against the real Lambda endpoint:
VITE_API_BASE_URL=https://ttpnms7nf9.execute-api.us-east-1.amazonaws.com/dev

# 6. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** If you omit `VITE_API_BASE_URL`, the dev server falls back to `https://jsonplaceholder.typicode.com` automatically. A production build will throw at startup if the variable is missing.

---

## Available Scripts

| Script | What it does | When to use it |
|---|---|---|
| `npm run dev` | Starts Vite dev server with HMR | Day-to-day development |
| `npm run build` | Runs `tsc -b` then Vite production build | Before deploying; also catches type errors |
| `npm run preview` | Serves the `dist/` build locally | Smoke-testing the production bundle before shipping |
| `npm run lint` | Runs ESLint across `src/` | Before opening a PR; CI runs this too |

A clean `npm run build` produces **zero TypeScript errors and zero warnings**.

---

## Project Structure

```
client/
├── index.html                          # Vite HTML entry point
├── vite.config.ts                      # Build config — defines the @/ path alias
├── tailwind.config.js                  # Custom brand color palette (brand-50 … brand-700)
├── .env.example                        # Template — copy to .env.local, never commit .env.local
│
└── src/
    │
    │  ── Entry points ─────────────────────────────────────────────────────
    ├── main.tsx                        # React root — wraps app with all providers
    ├── App.tsx                         # Renders <RouterProvider>; nothing else
    ├── index.css                       # Tailwind directives + base body background
    ├── vite-env.d.ts                   # Extends ImportMetaEnv with VITE_* variable types
    │
    │  ── Config / Utilities ────────────────────────────────────────────────
    ├── config/
    │   └── env.ts                      # Validated env object; throws in prod if API URL missing
    ├── lib/
    │   └── logger.ts                   # Structured logger — styled console in dev, JSON in prod
    ├── types/
    │   └── common.ts                   # Shared types: ApiError, SortDirection
    ├── utils/
    │   └── formatters.ts               # truncate() — appends Unicode ellipsis
    │
    │  ── Services ───────────────────────────────────────────────────────────
    ├── services/
    │   ├── apiClient.ts                # Singleton Axios instance — ALL HTTP goes here
    │   └── queryClient.ts             # Singleton QueryClient — shared TanStack Query config
    │
    │  ── Hooks (shared, domain-agnostic) ────────────────────────────────────
    ├── hooks/
    │   ├── useDebounce.ts              # Delays a value by N ms (default 300 ms)
    │   └── useExportCsv.ts            # Serializes an object array to CSV and triggers download
    │
    │  ── Components ─────────────────────────────────────────────────────────
    ├── components/
    │   ├── ui/                         # Reusable, domain-agnostic primitives
    │   │   ├── DataTable.tsx           # Generic DataTable<TData> — do not duplicate
    │   │   ├── StatusBadge.tsx         # Colored dot + label from raw API status string
    │   │   ├── DateCell.tsx            # Date with green/orange/red urgency coloring
    │   │   ├── NotFoundCell.tsx        # Shows "—" for "Not Found" / "0" sentinel values
    │   │   ├── FilterBar.tsx           # Toolbar wrapper: left filters + right actions
    │   │   ├── FilterDropdown.tsx      # Single-select dropdown for column filters
    │   │   ├── PageHeader.tsx          # Page title + subtitle
    │   │   ├── ExportButton.tsx        # CSV download trigger button
    │   │   ├── ResetButton.tsx         # Clears all active filters
    │   │   ├── SearchInput.tsx         # Controlled text search input
    │   │   ├── Spinner.tsx             # Accessible loading spinner (sm / md / lg)
    │   │   ├── ErrorAlert.tsx          # role="alert" error display card
    │   │   ├── AppLayout.tsx           # Shell: sidebar + header + main content area
    │   │   └── TablePagination.tsx     # Pagination bar with page-size selector
    │   ├── error/
    │   │   ├── GlobalErrorBoundary.tsx # Full-page fallback for uncaught React errors
    │   │   ├── PageErrorBoundary.tsx   # Card-level fallback with "Try Again" reset
    │   │   ├── NotFoundPage.tsx        # 404 page
    │   │   └── ForbiddenPage.tsx       # 403 page (redirected to by apiClient on 403 response)
    │   └── guards/
    │       └── ProtectedRoute.tsx      # Redirects unauthenticated users to /login
    │
    │  ── Context ─────────────────────────────────────────────────────────────
    ├── context/
    │   ├── AuthContext.tsx             # isAuthenticated state + login/logout shared across app
    │   └── SidebarContext.tsx          # Sidebar open/close state
    │
    │  ── Router ──────────────────────────────────────────────────────────────
    ├── router/
    │   ├── routes.ts                   # ROUTES const — single source of truth for all paths
    │   └── index.tsx                   # createBrowserRouter — lazy-loaded route tree
    │
    │  ── Feature Modules ─────────────────────────────────────────────────────
    └── modules/
        ├── auth/                       # Login page + useAuth re-export + auth service stub
        ├── navigation/
        │   └── config/navConfig.ts     # Sidebar nav items — add new pages here
        └── serverDetails/              # Full module: types → service → hooks → columns → page
            ├── types/                  # ServerDetailRaw (API shape) + ServerDetail (UI shape)
            ├── services/               # fetchServerDetails() — hits Lambda endpoint
            ├── hooks/                  # useServerDetails, useServerDetailsFilters
            ├── utils/                  # normalizeServerDetail — maps raw → UI type
            ├── components/             # serverDetailsColumns — ColumnDef[] for DataTable
            └── pages/                  # ServerDetailsPage — orchestrates everything above
```

---

## Architecture Decisions

### Axios singleton

All HTTP calls go through the single instance in `src/services/apiClient.ts`. This matters because request and response interceptors — auth token injection, 401/403/500 error handling, debug logging — are registered once at import time. If you import Axios directly anywhere else, those interceptors won't apply. When Okta is wired up, you'll uncomment two lines in the request interceptor; every API call in the app automatically benefits.

### TanStack Query

Components don't own their remote data. `useServerDetails()` hands the fetch off to TanStack Query, which deduplicates concurrent requests, caches results for 5 minutes, and retries transient failures twice before surfacing an error. Without it, every component would need its own `useEffect` + `useState` + loading/error flags — and navigating away and back would always refetch. The 5-minute `staleTime` was chosen because infrastructure inventory data doesn't change frequently; it prevents redundant fetches during normal in-app navigation.

### TanStack Table

TanStack Table is headless — it provides sorting, filtering, and pagination state with zero opinion about HTML or CSS. `DataTable.tsx` is the one place where that state is wired to markup. All current datasets fit comfortably in a single API response, so client-side pagination is appropriate. If row counts grow past ~10 000 and the API adds cursor-based pagination, TanStack Table's `manualPagination` mode handles that without component restructuring.

### Feature modules

Each non-trivial feature lives in `src/modules/<feature>/` with a predictable five-file shape: `types → service → hook → columns → page`. The boundary is deliberate — types never import from pages, pages import from everything else. This makes it safe to delete or replace a module without touching other modules. Simple read-only pages that only need a `useQuery` call don't need the full module structure; they can live in `src/pages/` with a single hook in `src/hooks/`.

### Path alias `@/`

`@/` maps to `src/`. It's configured in both `vite.config.ts` (for the bundler) and `tsconfig.app.json` (for the TypeScript language server). The alternative — relative imports like `../../../services/apiClient` — breaks silently when files move and makes the import graph opaque. Always use `@/` for any import that would climb more than one directory.

---

## Adding a New Page (read-only, no module needed)

Use this pattern for pages that only display data — no mutations, no sub-routes, no complex filter state.

**1. Create the page component**

```
src/pages/YourPage.tsx
```

```tsx
import { useYourData } from '@/hooks/useYourData';
import Spinner from '@/components/ui/Spinner';
import ErrorAlert from '@/components/ui/ErrorAlert';
import DataTable from '@/components/ui/DataTable';
import { yourColumns } from './yourColumns';

export default function YourPage() {
  const { data, isLoading, isError, error } = useYourData();

  if (isLoading) return <Spinner size="lg" />;
  if (isError)   return <ErrorAlert message={error.message} />;

  return <DataTable data={data ?? []} columns={yourColumns} />;
}
```

**2. Add a service function**

```
src/services/yourData.service.ts
```

```ts
import apiClient from '@/services/apiClient';

export async function fetchYourData(): Promise<YourType[]> {
  const response = await apiClient.get<YourType[]>('/your-endpoint');
  return response.data;
}
```

**3. Add a `useQuery` hook**

```
src/hooks/useYourData.ts
```

```ts
import { useQuery } from '@tanstack/react-query';
import { fetchYourData } from '@/services/yourData.service';

export const YOUR_DATA_QUERY_KEY = ['yourData'] as const;

export function useYourData() {
  return useQuery({ queryKey: YOUR_DATA_QUERY_KEY, queryFn: fetchYourData });
}
```

**4. Register the route**

In `src/router/routes.ts`, add:
```ts
YOUR_PAGE: '/your-page',
```

In `src/router/index.tsx`, add a lazy import and route entry:
```tsx
const YourPage = lazy(() => import('@/pages/YourPage'));

// inside the AppLayout children array:
{ path: ROUTES.YOUR_PAGE, element: <Suspense fallback={<PageFallback />}><YourPage /></Suspense> },
```

**5. Add a nav item**

In `src/modules/navigation/config/navConfig.ts`, add to the appropriate section:
```ts
{ label: 'Your Page', icon: SomeIcon, path: ROUTES.YOUR_PAGE, section: 'SECTION_NAME' },
```

---

## Adding a New Feature Module (complex feature with mutations or filters)

Use this pattern when the feature needs its own filter state, type normalization, or multiple hooks.

**1. Scaffold the module directory**

```
src/modules/yourFeature/
  types/yourFeature.types.ts
  services/yourFeature.service.ts
  hooks/useYourFeature.ts
  components/yourFeatureColumns.tsx   ← only if using DataTable
  pages/YourFeaturePage.tsx
```

**2. Define the TypeScript interface** in `types/yourFeature.types.ts`

If the API returns differently-shaped data, define both a `YourFeatureRaw` (matching the wire format exactly) and a `YourFeature` (camelCase, display-ready).

**3. Add a service function** in `services/yourFeature.service.ts`

Import `apiClient` from `@/services/apiClient`. If the API returns an envelope, unwrap it here and map through a `normalizeYourFeature()` utility.

**4. Create the `useQuery` hook** in `hooks/useYourFeature.ts`

Export a `YOUR_FEATURE_QUERY_KEY = ['yourFeature'] as const` alongside the hook for cache invalidation.

**5. Define columns** in `components/yourFeatureColumns.tsx`

Export a `ColumnDef<YourFeature, unknown>[]`. Use shared UI primitives (`NotFoundCell`, `StatusBadge`, `DateCell`) rather than writing inline cell renderers.

**6. Compose the page** in `pages/YourFeaturePage.tsx`

Render `<Spinner>` on `isLoading`, `<ErrorAlert>` on `isError`, `<DataTable>` on success. If the page needs filters, co-locate a `useYourFeatureFilters.ts` hook next to `useYourFeature.ts`.

**7. Register the route and nav item** — same as steps 4 and 5 in the read-only pattern above.

---

## Environment Variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `VITE_API_BASE_URL` | Optional in dev, **required in prod** | `https://jsonplaceholder.typicode.com` | Root URL for all API calls via `apiClient` |
| `VITE_LOG_LEVEL` | Optional | `info` | Minimum log level: `debug` \| `info` \| `warn` \| `error` |

All Vite environment variables must be prefixed with `VITE_` or they will not be available at runtime. Never commit `.env.local` or `.env` — add them to `.gitignore`.

---

## API Integration

### Base URL

The API base URL is read once at module load time in `src/services/apiClient.ts`. For local development, set it in `.env.local`. In CI/CD, inject it as an environment variable at build time.

### How the Axios instance works

`apiClient` is a configured Axios instance created once and re-used everywhere. It sets `Content-Type: application/json` and a 10-second timeout by default. Two interceptors are attached:

- **Request interceptor** — logs every outgoing request at `debug` level (method + URL only; no body, which may contain PII). The Okta token injection block lives here as a commented-out placeholder.
- **Response interceptor** — handles errors globally: 401 logs a warning (Okta will own the redirect), 403 navigates to `/forbidden`, 500+ logs a structured error. Network failures (no response object) log `"Network unavailable"`.

### Response envelope

The server-details endpoint returns results wrapped in a metadata envelope:

```json
{
  "message": "...",
  "bucket":  "s3-bucket-name",
  "key":     "path/to/object.json",
  "data":    [ { "Domain": "...", "Total Cores": 64, ... } ]
}
```

`message`, `bucket`, and `key` are S3 provenance metadata. Only `data` is consumed by the service layer; the rest is discarded at the fetch boundary.

### Normalization layer

The API returns field names with spaces (`"Total Cores"`, `"Maintenance Mode?"`) and raw numeric values (`"Memory": 4096`). The UI needs camelCase keys and display-ready strings (`memoryDisplay: "4 TB"`).

`normalizeServerDetail.ts` handles this mapping in one place. The key benefit: UI components only ever import `ServerDetail` (the clean interface), never `ServerDetailRaw`. If the API renames a field upstream, you fix it in the normalizer and nowhere else.

---

## Authentication

### Current state

Authentication is a stub. `AuthContext` holds an `isAuthenticated` flag. Clicking "Login" on the login page sets that flag to `true` via a mock `authLogin()` call in `src/modules/auth/services/auth.service.ts`. `ProtectedRoute` reads the flag and redirects unauthenticated users to `/login`.

### Planned: Okta integration

The wiring point is already in place. When Okta is ready:

1. Install `@okta/okta-react` and `@okta/okta-auth-js`
2. Implement `getAccessToken()` using the Okta SDK
3. Uncomment the two lines in the request interceptor in `src/services/apiClient.ts`:
   ```ts
   // const token = getAccessToken();
   // if (token) config.headers.Authorization = `Bearer ${token}`;
   ```
4. Add a 401 response interceptor handler in the same file to refresh tokens or redirect to Okta
5. Replace the stub `authLogin()` in `src/modules/auth/services/auth.service.ts` with the real Okta sign-in flow
6. Wrap `<App />` with `<Security>` in `src/main.tsx`
7. Add role-based checks in `src/components/guards/ProtectedRoute.tsx` (there is a `// TODO` comment there)

---

## Code Style Quick Reference

| Rule | Detail |
|---|---|
| No `React.FC` | Use plain function declarations: `export default function Foo(props: FooProps) {}` |
| No relative path climbing | Always use `@/` — never `../../services/apiClient` |
| No inline API calls in components | All HTTP lives in `src/services/` or `src/modules/*/services/` |
| No hardcoded URLs or tokens | URLs in `.env.local`; no credentials in source files |
| TypeScript strict — no `any` | Use `unknown` + type guards; assertions only when truly unavoidable |
| No comments on obvious code | Only document the WHY when it's non-obvious (hidden constraint, workaround, Okta placeholder) |

---

## Known Limitations / Roadmap

**Okta authentication is pending.** The current stub accepts any login click without validating credentials. `ProtectedRoute` enforces the in-memory flag but cannot prevent a page refresh from bypassing it. This is expected behavior until real session management is wired up.

**Role-based access control is not yet implemented.** `ProtectedRoute` has a `// TODO` comment marking where RBAC checks will be added once Okta provides group claims.

**Server-side pagination is not yet needed.** The current dataset fits in a single API response, so all filtering, sorting, and pagination happen client-side. If row counts grow past roughly 10 000, the `useServerDetails` hook and `DataTable` can be adapted to use TanStack Table's `manualPagination` mode alongside a cursor-based API endpoint.

**Most pages are placeholders.** Dashboard, Domain Summary, Server Summary, Resource Upgrades, BU Usage, Infra Runway, Executive View, and Configuration all render a `<ComingSoon>` component. Server Details is the only fully implemented page.
