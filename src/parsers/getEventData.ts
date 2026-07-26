import { EVENTS } from "@/data/events";
import { Event } from "@/types/event";

export type EventDetailData = {
  event: Event | null;
};

export const getEventData = (id: string): EventDetailData => ({
  event: EVENTS.find((e) => e.id === id) ?? null,
});
