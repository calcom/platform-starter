import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Booker } from "@/features/booker/booker";
import { BookerSkeleton } from "@/features/booker/booker-skeleton";
import { getTeamEventType } from "@/lib/cal-api/event-types";

type PageProps = {
  params: Promise<{ teamSlug: string; eventSlug: string }>;
  searchParams: Promise<{ rescheduleUid?: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { teamSlug, eventSlug } = await params;
  return {
    title: `Book a ${eventSlug} with ${teamSlug}`,
  };
}

export default async function TeamBookerPage({ params, searchParams }: PageProps) {
  const { teamSlug, eventSlug } = await params;
  const { rescheduleUid } = await searchParams;

  const eventType = await getTeamEventType({ teamSlug, eventSlug });
  if (!eventType) notFound();

  return (
    <main className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={<BookerSkeleton />}>
        <Booker eventType={eventType} rescheduleBookingUid={rescheduleUid} />
      </Suspense>
    </main>
  );
}
