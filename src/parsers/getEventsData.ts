import { EVENTS, EVENT_CATEGORIES } from "@/data/events";
import { Event } from "@/types/event";
import { applySoldSeats, getSoldQuantity } from "@/lib/seats";

export type EventsData = {
  events: Event[];
  categories: readonly string[];
};

export const getEventsData = async (): Promise<EventsData> => {
  const events = await Promise.all(
    EVENTS.map(async (event) =>
      applySoldSeats(event, await getSoldQuantity(event.id)),
    ),
  );

  return { events, categories: EVENT_CATEGORIES };
};
