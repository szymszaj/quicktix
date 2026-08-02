"use client";

import { useState, useMemo } from "react";
import { TicketX } from "lucide-react";
import { Event } from "@/types/event";
import { EventCard } from "@/components/molecules/EventCard";
import { CategoryFilter } from "@/components/molecules/CategoryFilter";

type EventGridProps = {
  events: Event[];
  categories: readonly string[];
};

const EventGrid = ({ events, categories }: EventGridProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filtered = useMemo(
    () =>
      activeCategory === categories[0]
        ? events
        : events.filter((e) => e.category === activeCategory),
    [activeCategory, events, categories],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Nadchodzące wydarzenia
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {filtered.length}{" "}
            {filtered.length === 1 ? "wydarzenie" : "wydarzeń"}
          </p>
        </div>
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center text-gray-400">
          <TicketX size={48} strokeWidth={1.5} />
          <p>Brak wydarzeń w tej kategorii.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default EventGrid;
