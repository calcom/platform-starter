"use client";

import { AlertTriangleIcon, RotateCcwIcon } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message = humanize(error.message);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emphasis text-foreground">
        <AlertTriangleIcon className="size-7" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => reset()}>
          <RotateCcwIcon className="size-4" />
          Try again
        </Button>
        <Button variant="outline" asChild>
          <a href="/">Go home</a>
        </Button>
      </div>
    </main>
  );
}

function humanize(raw: string): string {
  if (!raw) return "An unexpected error occurred.";
  if (raw.toLowerCase().includes("too many requests")) {
    return "Cal.com is rate-limiting requests right now. Wait a moment and retry.";
  }
  return raw.length > 220 ? `${raw.slice(0, 217)}...` : raw;
}
