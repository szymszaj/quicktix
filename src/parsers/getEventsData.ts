import { EVENTS, EVENT_CATEGORIES } from "@/data/events";
import { Event } from "@/types/event";

export type EventsData = {
  events: Event[];
  categories: readonly string[];
};

export const getEventsData = (): EventsData => ({
  events: EVENTS,
  categories: EVENT_CATEGORIES,
});
