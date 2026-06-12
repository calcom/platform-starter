import { notFound } from "next/navigation";

import { BookingDetails } from "@/features/booking/booking-details";
import { getBooking } from "@/lib/cal-api/bookings";
import { CalApiError } from "@/lib/cal-api/client";
import { getEventTypeById } from "@/lib/cal-api/event-types";
import type { Booking } from "@/lib/cal-api/types";

type PageProps = {
  params: Promise<{ uid: string }>;
  searchParams: Promise<{ fresh?: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { uid } = await params;
  return { title: `Booking ${uid}` };
}

export default async function ManageBookingPage({ params, searchParams }: PageProps) {
  const { uid } = await params;
  const { fresh } = await searchParams;

  let booking: Booking;
  try {
    booking = await getBooking(uid);
  } catch (error) {
    if (error instanceof CalApiError && error.status === 404) notFound();
    throw error;
  }

  const [previousStart, eventType] = await Promise.all([
    booking.rescheduledFromUid
      ? getBooking(booking.rescheduledFromUid)
          .then((b) => b.start as string | null)
          .catch(() => null)
      : Promise.resolve(null),
    getEventTypeById(booking.eventTypeId).catch(() => null),
  ]);

  const slug = booking.eventType?.slug ?? eventType?.slug;
  const teamSlug = eventType?.team?.slug;
  const hostUsername = booking.hosts[0]?.username;
  const rescheduleHref = slug
    ? teamSlug
      ? `/book/team/${teamSlug}/${slug}?rescheduleUid=${booking.uid}`
      : hostUsername
        ? `/book/${hostUsername}/${slug}?rescheduleUid=${booking.uid}`
        : null
    : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <BookingDetails
        booking={booking}
        isFresh={fresh === "1"}
        previousStart={previousStart}
        rescheduleHref={rescheduleHref}
      />
    </main>
  );
}
