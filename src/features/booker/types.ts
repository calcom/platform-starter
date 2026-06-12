import type { EventType, Slot } from "@/lib/cal-api/types";

export type BookerStep = "select_date" | "attendee_form";

export type BookerSnapshot = {
  step: BookerStep;
  selectedDate: string | null;
  selectedSlot: Slot | null;
  timeFormat: "12h" | "24h";
  timeZone: string;
};

export type BookerProps = {
  eventType: EventType;
  rescheduleBookingUid?: string;
  initialTimeZone?: string;
};
