import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEventData } from "@/parsers/getEventData";
import { EventDetail } from "@/components/organisms/EventDetail";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { event } = getEventData(id);

  if (!event) return { title: "Wydarzenie nie istnieje" };

  return {
    title: `${event.title} — QuickTix`,
    description: `Kup bilet na "${event.title}". Cena od ${formatPrice(event.price)}.`,
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const { event } = getEventData(id);

  if (!event) notFound();

  return <EventDetail event={event} />;
}
