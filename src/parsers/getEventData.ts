import { EVENTS } from "@/data/events";
import { Event } from "@/types/event";
import { applySoldSeats, getSoldQuantity } from "@/lib/seats";

export type EventDetailData = {
  event: Event | null;
};

export const getEventData = async (id: string): Promise<EventDetailData> => {
  const event = EVENTS.find((e) => e.id === id) ?? null;
  if (!event) return { event: null };

  const sold = await getSoldQuantity(event.id);
  return { event: applySoldSeats(event, sold) };
};
