"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EventType, Slot } from "@/lib/cal-api/types";
import { createBookingAction, rescheduleBookingAction } from "./actions";

const createSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  notes: z.string().optional(),
});
const rescheduleSchema = z.object({
  reschedulingReason: z.string().optional(),
});
type CreateValues = z.infer<typeof createSchema>;
type RescheduleValues = z.infer<typeof rescheduleSchema>;

type BookingFormProps = {
  eventType: EventType;
  slot: Slot;
  timeZone: string;
  rescheduleBookingUid?: string;
  onCancel: () => void;
};

export function BookingForm(props: BookingFormProps) {
  const isReschedule = Boolean(props.rescheduleBookingUid);
  return isReschedule ? <RescheduleForm {...props} /> : <CreateForm {...props} />;
}

function CreateForm({ eventType, slot, timeZone, onCancel }: BookingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", email: "", notes: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await createBookingAction({
        eventTypeId: eventType.id,
        start: slot.start,
        attendee: { name: values.name, email: values.email, timeZone },
        bookingFieldsResponses: values.notes ? { notes: values.notes } : undefined,
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      router.push(`/booking/${result.booking.uid}?fresh=1`);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex h-full flex-col gap-4 p-6 sm:p-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional notes (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="What would you like to discuss?" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormFooter
          isPending={isPending}
          submitLabel="Confirm booking"
          pendingLabel="Confirming"
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}

function RescheduleForm({ slot, rescheduleBookingUid, onCancel }: BookingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<RescheduleValues>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: { reschedulingReason: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await rescheduleBookingAction({
        uid: rescheduleBookingUid!,
        start: slot.start,
        reschedulingReason: values.reschedulingReason,
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      router.push(`/booking/${result.booking.uid}?fresh=1`);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex h-full flex-col gap-4 p-6 sm:p-8">
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight">Confirm new time</h3>
          <p className="text-sm text-muted-foreground">
            We'll update your existing booking and notify the host.
          </p>
        </div>

        <FormField
          control={form.control}
          name="reschedulingReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for rescheduling (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Let the host know what's changed" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormFooter
          isPending={isPending}
          submitLabel="Reschedule"
          pendingLabel="Rescheduling"
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}

function FormFooter({
  isPending,
  submitLabel,
  pendingLabel,
  onCancel,
}: {
  isPending: boolean;
  submitLabel: string;
  pendingLabel: string;
  onCancel: () => void;
}) {
  return (
    <div className="mt-auto flex items-center justify-end gap-2 pt-4">
      <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>
        Back
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
            {pendingLabel}
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
}
