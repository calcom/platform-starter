import { HeartIcon } from "lucide-react";

const REPO_URL = "https://github.com/calcom/developer-starter-kit";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p className="flex items-center gap-1.5">
          Open source · MIT · built with{" "}
          <HeartIcon className="inline size-3.5 fill-current" aria-hidden /> for the Cal.com
          community
        </p>
        <nav className="flex items-center gap-4">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Cal.com
          </a>
          <a
            href="https://cal.com/docs/api-reference/v2/introduction"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            API
          </a>
        </nav>
      </div>
    </footer>
  );
}
