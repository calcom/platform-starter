"use client";

import { formatInTimeZone } from "date-fns-tz";
import { CalendarX2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Slot } from "@/lib/cal-api/types";
import { formatSlotTime } from "./utils";

type TimeSlotsProps = {
  selectedDate: Date | null;
  slots: Slot[];
  selectedSlot: Slot | null;
  onSelectSlot: (slot: Slot) => void;
  timeZone: string;
  timeFormat: "12h" | "24h";
  isLoading: boolean;
  onToggleTimeFormat: () => void;
};

export function TimeSlots({
  selectedDate,
  slots,
  selectedSlot,
  onSelectSlot,
  timeZone,
  timeFormat,
  isLoading,
  onToggleTimeFormat,
}: TimeSlotsProps) {
  if (!selectedDate) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted-foreground">
        Pick a day to see available times
      </div>
    );
  }

  return (
    <div
      className="flex min-h-[420px] flex-col gap-4 p-6 sm:px-6 sm:py-4"
      style={{ maxHeight: "560px" }}
    >
      <header className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold tracking-tight">
          {formatInTimeZone(selectedDate, timeZone, "EEE d MMM")}
        </h2>
        <button
          type="button"
          onClick={onToggleTimeFormat}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {timeFormat === "12h" ? "12h" : "24h"}
        </button>
      </header>

      {isLoading ? (
        <TimeSlotsSkeleton />
      ) : slots.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="-mr-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-2">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.start === slot.start;
            return (
              <Button
                key={slot.start}
                type="button"
                variant={isSelected ? "default" : "outline"}
                onClick={() => onSelectSlot(slot)}
                className="h-10 w-full justify-center font-medium tabular-nums"
              >
                {formatSlotTime(slot.start, timeZone, timeFormat)}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TimeSlotsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {["a", "b", "c", "d", "e", "f"].map((id) => (
        <Skeleton key={id} className="h-10 w-full" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
      <CalendarX2Icon className="size-6" />
      <span>No availability for this day</span>
    </div>
  );
}
