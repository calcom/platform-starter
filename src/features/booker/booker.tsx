"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import { Separator } from "@/components/ui/separator";
import type { AvailableSlots, Slot } from "@/lib/cal-api/types";
import { fetchSlotsAction } from "./actions";
import { BookingForm } from "./booking-form";
import { DatePicker } from "./date-picker";
import { EventMeta } from "./event-meta";
import { TimeSlots } from "./time-slots";
import type { BookerProps, BookerStep } from "./types";
import { detectBrowserTimeZone, detectTimeFormat, formatDayKey, getMonthBounds } from "./utils";

export function Booker({ eventType, rescheduleBookingUid, initialTimeZone }: BookerProps) {
  const [step, setStep] = useState<BookerStep>("select_date");
  const [timeZone, setTimeZone] = useState(initialTimeZone ?? "UTC");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("24h");
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slotsByDay, setSlotsByDay] = useState<AvailableSlots>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingSlots, startSlotsTransition] = useTransition();

  useEffect(() => {
    setTimeZone(detectBrowserTimeZone());
    setTimeFormat(detectTimeFormat());
  }, []);

  useEffect(() => {
    const bounds = getMonthBounds(currentMonth, timeZone);
    startSlotsTransition(async () => {
      const result = await fetchSlotsAction({
        eventTypeId: eventType.id,
        start: bounds.start,
        end: bounds.end,
        timeZone,
      });
      if (result.ok) {
        setSlotsByDay(result.slots);
        setErrorMessage(null);
      } else {
        setSlotsByDay({});
        setErrorMessage(result.error);
      }
    });
  }, [eventType.id, currentMonth, timeZone]);

  const availableDays = useMemo(() => {
    const set = new Set<string>();
    for (const [day, slots] of Object.entries(slotsByDay)) {
      if (slots.length > 0) set.add(day);
    }
    return set;
  }, [slotsByDay]);

  const slotsForDay = useMemo(() => {
    if (!selectedDate) return [] as Slot[];
    return slotsByDay[formatDayKey(selectedDate)] ?? [];
  }, [selectedDate, slotsByDay]);

  function resetToDateStep() {
    setStep("select_date");
    setSelectedSlot(null);
  }

  if (step === "attendee_form" && selectedSlot) {
    return (
      <div
        key="step-attendee"
        className="step-enter mx-auto grid max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-sm md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >
        <div className="border-b md:border-b-0 md:border-r">
          <EventMeta
            eventType={eventType}
            selectedSlot={selectedSlot}
            timeZone={timeZone}
            onTimeZoneChange={setTimeZone}
            timeFormat={timeFormat}
            formerSlotStart={rescheduleBookingUid ? null : null}
          />
        </div>
        <BookingForm
          eventType={eventType}
          slot={selectedSlot}
          timeZone={timeZone}
          rescheduleBookingUid={rescheduleBookingUid}
          onCancel={resetToDateStep}
        />
      </div>
    );
  }

  return (
    <div
      key="step-date"
      className="step-enter mx-auto grid max-w-6xl overflow-hidden rounded-2xl border bg-card shadow-sm md:grid-cols-[minmax(260px,1fr)_minmax(0,1.4fr)_minmax(220px,1fr)]"
    >
      <div className="border-b md:border-b-0 md:border-r">
        <EventMeta
          eventType={eventType}
          selectedSlot={selectedSlot}
          timeZone={timeZone}
          onTimeZoneChange={setTimeZone}
          timeFormat={timeFormat}
        />
      </div>

      <div className="flex w-full items-stretch border-b md:border-b-0 md:border-r">
        <DatePicker
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          selectedDate={selectedDate}
          availableDays={availableDays}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setSelectedSlot(null);
          }}
        />
      </div>

      <div>
        {errorMessage ? (
          <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-2 p-6 text-center text-sm text-destructive">
            <span>Could not load availability</span>
            <span className="text-xs text-muted-foreground">{errorMessage}</span>
          </div>
        ) : (
          <TimeSlots
            selectedDate={selectedDate}
            slots={slotsForDay}
            selectedSlot={selectedSlot}
            onSelectSlot={(slot) => {
              setSelectedSlot(slot);
              setStep("attendee_form");
            }}
            timeZone={timeZone}
            timeFormat={timeFormat}
            isLoading={isLoadingSlots}
            onToggleTimeFormat={() =>
              setTimeFormat((current) => (current === "12h" ? "24h" : "12h"))
            }
          />
        )}
      </div>

      <Separator className="md:hidden" />
    </div>
  );
}
