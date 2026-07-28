import { EventGrid } from "@/components/organisms/EventGrid";
import { getEventsData } from "@/parsers/getEventsData";

export default function HomePage() {
  const { events, categories } = getEventsData();

  return (
    <>
      <section className="bg-zinc-950 px-4 py-16 text-center sm:px-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-400">
          Najszybszy zakup biletów online
        </p>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          Twój bilet w kilka sekund
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
          Koncerty, mecze, spektakle i konferencje — znajdź wydarzenie i kup
          bilet bez zbędnych kroków.
        </p>
      </section>

      <EventGrid events={events} categories={categories} />
    </>
  );
}
