# Cal.com Developer SDK Starter

A Next.js template for embedding the Cal.com Developer SDK flows in your product, without the `@calcom/atoms` SDK. Every component lives in this repository, so you own the visuals, the markup, and the data layer end-to-end.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcalcom%2Fdeveloper-starter-kit&env=CAL_API_KEY,NEXT_PUBLIC_CAL_USERNAME,NEXT_PUBLIC_BRAND_NAME&envDescription=Your%20Cal.com%20API%20key%20and%20default%20username&envLink=https%3A%2F%2Fapp.cal.com%2Fsettings%2Fdeveloper%2Fapi-keys)

## What you get

| Route | What it does |
| --- | --- |
| `/` | Landing page with shortcuts to every flow |
| `/book/[username]/[eventSlug]` | Public booking widget — month calendar, time slots, attendee form, confirmation |
| `/book/[username]/[eventSlug]?rescheduleUid=…` | Same widget in reschedule mode |
| `/booking/[uid]` | Manage an existing booking — view, reschedule, cancel |
| `/routing/[id]` | Config-driven routing that maps form responses to event types |

Every flow talks to the **Cal.com API v2** through a thin server-side client (`src/lib/cal-api/`). No client-side SDK. No `@calcom/atoms` dependency.

## Stack

- **Next.js 16** (App Router, RSC, Server Actions)
- **React 19**
- **Tailwind CSS v4** with CSS-first config
- **shadcn/ui** primitives, copied into `src/components/ui/`
- **Biome** for lint + format
- **bun** for install + scripts
- **TypeScript strict**
- **react-day-picker v9** for the month calendar
- **react-hook-form + zod** for the attendee form

## Quickstart

```bash
bun install
cp .env.example .env.local
# Fill in CAL_API_KEY and NEXT_PUBLIC_CAL_USERNAME
bun dev
```

Open <http://localhost:3000>.

## Environment

| Variable | Required | Description |
| --- | --- | --- |
| `CAL_API_KEY` | yes | API key from <https://app.cal.com/settings/developer/api-keys> |
| `CAL_API_URL` | no | Defaults to `https://api.cal.com/v2`. Override for self-hosted |
| `CAL_API_VERSION` | no | Defaults to `2024-08-13` |
| `NEXT_PUBLIC_CAL_USERNAME` | no | Default username used by the landing-page shortcuts |
| `NEXT_PUBLIC_BRAND_NAME` | no | Replaces the brand label across the app |

## Project layout

```
src/
├── app/                      # Next.js routes
│   ├── page.tsx              # landing
│   ├── book/[username]/[eventSlug]/page.tsx
│   ├── booking/[uid]/page.tsx
│   └── routing/[id]/page.tsx
├── components/
│   ├── theme-provider.tsx
│   └── ui/                   # shadcn primitives — own them, edit them
├── features/
│   ├── booker/               # booking widget — every panel and step
│   ├── booking/              # manage-booking flow
│   └── routing/              # routing renderer
└── lib/
    ├── cal-api/              # typed Cal.com API v2 client (server-only)
    ├── routing/              # local routing registry + evaluator
    └── utils.ts
```

The Booker is decomposed into the same panels you would build by hand:

```
features/booker/
├── booker.tsx                # orchestrator (steps, state)
├── event-meta.tsx            # left panel — host, title, duration, timezone
├── date-picker.tsx           # middle panel — month calendar
├── time-slots.tsx            # right panel — slot list
├── booking-form.tsx          # attendee form (name / email / notes)
├── booking-confirmation.tsx  # success screen
├── booker-skeleton.tsx       # loading state
├── actions.ts                # server actions (fetch slots, create, reschedule)
├── utils.ts                  # date / timezone helpers
└── types.ts
```

## Routing

The starter ships with a **config-driven** routing flow (`src/lib/routing/registry.ts`). It mirrors the embedder-facing UX: collect responses, evaluate rules, send the visitor to the matching event type.

The Cal.com API v2 exposes routing forms only under the **organization** scope (`/organizations/{orgId}/routing-forms`). If you have org credentials, replace the local registry with `getOrgRoutingForms` and `getOrgRoutingFormResponses` calls — the renderer doesn't change.

For single-tenant use, edit `src/lib/routing/registry.ts` to define your fields and rules. Each rule maps response equality to either:

- another booker page (`{ kind: "event-type" }`)
- an external URL (`{ kind: "url" }`)
- a final message (`{ kind: "message" }`)

## Theming

The shadcn primitives in `src/components/ui/` read CSS variables defined in `src/app/globals.css`. Tweak the `--primary`, `--background`, `--emphasis` tokens (and their `.dark` counterparts) and the entire app follows. Tailwind v4's `@theme inline` block wires those variables to utility classes.

### Fonts

The starter uses **Cal Sans** (the Cal.com brand typeface) loaded via `next/font/local` in `src/app/layout.tsx`. The woff2 files live in `src/fonts/` and are exposed as `--font-sans` (UI body) and `--font-heading` (display headings). To swap for another font, replace the files in `src/fonts/` or switch to `next/font/google`.

## Why not just use `@calcom/atoms`?

`@calcom/atoms` is great when you want batteries-included scheduling and don't care about exact markup. This template targets the opposite: you own every line, swap any primitive, and have nothing to upgrade against. The trade-off is that you build the surface area you need — start with the Booker, add what comes next.

## Scripts

```bash
bun dev          # next dev
bun run build    # next build
bun start        # next start
bun typecheck    # tsc --noEmit
bun check        # biome check --write
bun lint         # biome lint
bun format       # biome format --write
```

## License

MIT.
