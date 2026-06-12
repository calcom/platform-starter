import {
  ArrowRightIcon,
  CalendarIcon,
  CircleCheckBigIcon,
  FormInputIcon,
  PaintbrushIcon,
  RocketIcon,
  SparklesIcon,
  StarIcon,
  TerminalIcon,
} from "lucide-react";
import Link from "next/link";

import { HeroBackground } from "@/components/hero-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingLookupCard } from "@/features/booking/booking-lookup-card";
import { getDefaultEventTypeSlug, getDefaultUsername } from "@/lib/cal-api/env";
import { formatStarCount, getRepoStars } from "@/lib/github";

const REPO_URL = "https://github.com/calcom/developer-starter-kit";
const FORK_URL = `${REPO_URL}/fork`;
const DEPLOY_URL =
  "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcalcom%2Fdeveloper-starter-kit&env=CAL_API_KEY,NEXT_PUBLIC_CAL_USERNAME,NEXT_PUBLIC_BRAND_NAME&envDescription=Your%20Cal.com%20API%20key%20and%20default%20username&envLink=https%3A%2F%2Fapp.cal.com%2Fsettings%2Fdeveloper%2Fapi-keys&project-name=developer-starter-kit&repository-name=developer-starter-kit";

function VercelIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2L24 22H0L12 2Z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.79.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default async function HomePage() {
  const username = getDefaultUsername();
  const eventSlug = getDefaultEventTypeSlug();
  const bookerHref = username
    ? `/book/${username}/${eventSlug}`
    : `/book/your-username/${eventSlug}`;
  const stars = await getRepoStars();

  return (
    <main className="relative">
      <HeroBackground />

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-32">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <SparklesIcon className="size-3" />
          Built on Cal.com Platform · no SDK lock-in
        </div>

        <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          Scheduling, in <span className="text-muted-foreground">your</span> codebase.
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          A Next.js starter that wires Cal.com Platform flows into your product — every component
          lives here, owned and styled by you.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-11 px-6 text-sm">
            <Link href={bookerHref}>
              Open the Booker
              <ArrowRightIcon />
            </Link>
          </Button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-11 items-stretch overflow-hidden rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:border-foreground/30"
          >
            <span className="inline-flex items-center gap-2 px-5 transition-colors group-hover:bg-accent">
              <GitHubIcon className="size-4" />
              Star on GitHub
            </span>
            {stars !== null ? (
              <span className="inline-flex items-center gap-1.5 border-l border-input bg-muted/40 px-4 tabular-nums text-foreground/80 transition-colors group-hover:bg-muted/70">
                <StarIcon className="size-3.5 fill-current text-amber-500" />
                {formatStarCount(stars)}
              </span>
            ) : null}
          </a>
        </div>

        <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          <Stat label="Routes" value="3" />
          <Stat label="UI primitives" value="13" />
          <Stat label="External UI deps" value="0" />
          <Stat label="Bun + Biome" value="✓" />
        </dl>
      </section>

      <section className="mx-auto flex max-w-5xl justify-center px-6 pb-20">
        <ShadcnTeaserBanner />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <header className="mb-8 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Surfaces
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Three flows, owned end-to-end.
          </h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FlowCard
            icon={<CalendarIcon className="size-4" />}
            label="Booker"
            title="Public booking page"
            description="Month calendar, time slots, attendee form, confirmation. The flagship flow."
            href={bookerHref}
            ctaLabel={username ? `/book/${username}/${eventSlug}` : "/book/[username]/[eventSlug]"}
          />
          <BookingLookupCard />
          <FlowCard
            icon={<FormInputIcon className="size-4" />}
            label="Routing"
            title="Conditional routing"
            description="A form scaffold that maps responses to event types. Local registry, easy to swap."
            href="/routing/sales-intake"
            ctaLabel="/routing/[id]"
            ctaVariant="outline"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <TerminalIcon className="size-4" /> Quickstart
              </div>
              <CardTitle>Get it running in 60 seconds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Run locally
                </p>
                <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-xs leading-relaxed">
                  <code>{`bun install
cp .env.example .env.local
# add CAL_API_KEY and NEXT_PUBLIC_CAL_USERNAME
bun dev`}</code>
                </pre>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Or skip local setup
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={FORK_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <GitHubIcon className="size-4" />
                    Fork on GitHub
                  </a>
                  <a
                    href={DEPLOY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background shadow-sm transition-opacity hover:opacity-90"
                  >
                    <VercelIcon className="size-3.5" />
                    Deploy with Vercel
                  </a>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Need a key?{" "}
                <a
                  href="https://app.cal.com/settings/developer/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  Generate one in Cal.com
                </a>
                .
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <PaintbrushIcon className="size-4" /> Make it yours
              </div>
              <CardTitle>Every component lives in /src</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <Bullet>
                  <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                    src/components/ui
                  </code>{" "}
                  — shadcn primitives, edit freely.
                </Bullet>
                <Bullet>
                  <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                    src/features/booker
                  </code>{" "}
                  — every panel of the booking widget.
                </Bullet>
                <Bullet>
                  <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                    src/app/globals.css
                  </code>{" "}
                  — CSS variables drive the whole theme.
                </Bullet>
                <Bullet>
                  <code className="rounded bg-muted px-1 py-0.5 text-[11px]">src/lib/cal-api</code>{" "}
                  — typed server-only client. No client SDK.
                </Bullet>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function ShadcnTeaserBanner() {
  return (
    <div className="group relative w-full" style={{ maxWidth: "560px" }}>
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: "18px",
          background: "var(--background)",
          border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
          boxShadow: "0 16px 40px -22px rgba(0,0,0,0.25)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "radial-gradient(circle, var(--muted-foreground) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            WebkitMaskImage:
              "radial-gradient(ellipse 50% 100% at 100% 50%, black, transparent 70%)",
            maskImage: "radial-gradient(ellipse 50% 100% at 100% 50%, black, transparent 70%)",
          }}
        />

        <div className="relative flex items-center" style={{ gap: "16px", padding: "18px 22px" }}>
          <div
            className="shrink-0"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--foreground) 18%, transparent), color-mix(in oklab, var(--foreground) 8%, transparent))",
              border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RocketIcon
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-12"
              style={{ width: "22px", height: "22px", color: "var(--foreground)" }}
              strokeWidth={2}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col" style={{ gap: "3px" }}>
            <div className="flex flex-wrap items-center" style={{ gap: "8px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.005em" }}>
                Install from shadcn registry
              </h3>
              <span
                className="inline-flex items-center"
                style={{
                  gap: "3px",
                  borderRadius: "999px",
                  padding: "1px 7px",
                  background: "color-mix(in oklab, var(--muted) 80%, transparent)",
                  color: "var(--muted-foreground)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Coming soon
              </span>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted-foreground)",
                lineHeight: 1.45,
              }}
            >
              Pull every primitive and flow into your project with one command.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 border-l-0 sm:border-l sm:first:border-l-0 sm:px-4">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-semibold tracking-tight">{value}</dd>
    </div>
  );
}

type FlowCardProps = {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  ctaVariant?: "default" | "outline";
};

function FlowCard({
  icon,
  label,
  title,
  description,
  href,
  ctaLabel,
  ctaVariant = "default",
}: FlowCardProps) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {icon} {label}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant={ctaVariant}>
          <Link href={href}>
            {ctaLabel}
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CircleCheckBigIcon className="mt-0.5 size-4 shrink-0 text-foreground/70" />
      <span>{children}</span>
    </li>
  );
}
