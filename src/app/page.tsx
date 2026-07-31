import { Hero } from "@/components/organisms/Hero";
import { EventGrid } from "@/components/organisms/EventGrid";
import { getHomepageData } from "@/parsers/getHomepageData";
import { getEventsData } from "@/parsers/getEventsData";

export default function HomePage() {
  const { hero } = getHomepageData();
  const { events, categories } = getEventsData();

  return (
    <>
      <Hero {...hero} />
      <EventGrid events={events} categories={categories} />
    </>
  );
}
