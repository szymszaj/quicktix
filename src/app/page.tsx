import { EventGrid } from "@/components/organisms/EventGrid";

export default function HomePage() {
  return (
    <>
      <section className="bg-indigo-900 px-4 py-16 text-center sm:px-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-300">
          Najszybszy zakup biletów online
        </p>
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          Twój bilet w kilka sekund
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-200">
          Koncerty, mecze, spektakle i konferencje — znajdź wydarzenie i kup
          bilet bez zbędnych kroków.
        </p>
      </section>

      <EventGrid />
    </>
  );
}
