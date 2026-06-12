import "server-only";

import { calApi } from "./client";
import type { EventType } from "./types";

const EVENT_TYPES_API_VERSION = "2024-06-14";

export async function listEventTypes(params: {
  username?: string;
  teamSlug?: string;
  orgSlug?: string;
  eventSlug?: string;
}): Promise<EventType[]> {
  const cacheKey = params.teamSlug ?? params.username ?? "all";
  return calApi<EventType[]>("/event-types", {
    apiVersion: EVENT_TYPES_API_VERSION,
    query: {
      username: params.username,
      teamSlug: params.teamSlug,
      orgSlug: params.orgSlug,
      eventSlug: params.eventSlug,
    },
    next: { revalidate: 60, tags: ["event-types", cacheKey] },
  });
}

export async function getEventType(params: {
  username: string;
  eventSlug: string;
  orgSlug?: string;
}): Promise<EventType | null> {
  const matches = await listEventTypes(params);
  return matches[0] ?? null;
}

export async function getTeamEventType(params: {
  teamSlug: string;
  eventSlug: string;
  orgSlug?: string;
}): Promise<EventType | null> {
  const matches = await listEventTypes(params);
  return matches[0] ?? null;
}

export async function getEventTypeById(eventTypeId: number): Promise<EventType> {
  return calApi<EventType>(`/event-types/${eventTypeId}`, {
    apiVersion: EVENT_TYPES_API_VERSION,
    next: { revalidate: 60, tags: [`event-type-${eventTypeId}`] },
  });
}
