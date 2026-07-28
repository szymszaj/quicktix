"use client";

import Link from "next/link";
import { Music2, Trophy, Clapperboard, MonitorPlay } from "lucide-react";
import { Event } from "@/types/event";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

type EventCardProps = {
  event: Event;
};

const CategoryIcon: Record<string, React.ElementType> = {
  Koncert: Music2,
  Sport: Trophy,
  Teatr: Clapperboard,
  Konferencja: MonitorPlay,
};

const SeatsBadge = ({
  available,
  total,
}: {
  available: number;
  total: number;
}) => {
  const pct = available / total;
  const sold = available === 0;

  return (
    <span
      className={cn(
        "text-xs font-medium",
        sold && "text-red-500",
        !sold && pct < 0.1 && "text-orange-500",
        !sold && pct >= 0.1 && "text-gray-400",
      )}
    >
      {sold ? "Wyprzedane" : `${available.toLocaleString("pl-PL")} miejsc`}
    </span>
  );
};

const EventCard = ({ event }: EventCardProps) => {
  const sold = event.availableSeats === 0;
  const Icon = CategoryIcon[event.category];

  return (
    <Link
      href={`/event/${event.id}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm",
        "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
        sold && "opacity-60",
      )}
    >
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-zinc-100">
        <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
          {Icon && <Icon size={64} strokeWidth={1.25} />}
        </div>
        <div className="absolute top-3 left-3">
          <Badge label={event.category} />
        </div>
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="rounded-full bg-red-500 px-4 py-1 text-sm font-bold text-white">
              Wyprzedane
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1 text-sm text-gray-400">
          <span>
            {formatDate(event.date)} · {event.time}
          </span>
          <span>
            {event.venue}, {event.city}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(event.price)}
            </span>
            <SeatsBadge
              available={event.availableSeats}
              total={event.totalSeats}
            />
          </div>
          <span
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
              sold
                ? "bg-gray-100 text-gray-400"
                : "bg-orange-500 text-white group-hover:bg-orange-600",
            )}
          >
            {sold ? "Brak biletów" : "Kup bilet"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
