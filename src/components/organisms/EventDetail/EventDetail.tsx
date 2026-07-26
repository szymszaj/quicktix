import {
  Music2,
  Trophy,
  Clapperboard,
  MonitorPlay,
  Calendar,
  Clock,
  MapPin,
  Armchair,
  AlertTriangle,
} from "lucide-react";
import { Event } from "@/types/event";
import { Badge } from "@/components/atoms/Badge";
import { TicketForm } from "@/components/molecules/TicketForm";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

const CategoryIcon: Record<string, React.ElementType> = {
  Koncert: Music2,
  Sport: Trophy,
  Teatr: Clapperboard,
  Konferencja: MonitorPlay,
};

type EventDetailProps = {
  event: Event;
};

const EventDetail = ({ event }: EventDetailProps) => {
  const pct = event.availableSeats / event.totalSeats;
  const low = event.availableSeats > 0 && pct < 0.1;
  const Icon = CategoryIcon[event.category];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-400">
            {Icon && <Icon size={96} strokeWidth={1.25} />}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge label={event.category} />
            {low && (
              <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-0.5 text-xs font-semibold text-orange-600">
                <AlertTriangle size={12} />
                Ostatnie miejsca!
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {event.title}
          </h1>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <InfoTile
              Icon={Calendar}
              label="Data"
              value={formatDate(event.date)}
            />
            <InfoTile Icon={Clock} label="Godzina" value={event.time} />
            <InfoTile
              Icon={MapPin}
              label="Miejsce"
              value={`${event.venue}, ${event.city}`}
            />
            <InfoTile
              Icon={Armchair}
              label="Wolne miejsca"
              value={
                event.availableSeats === 0
                  ? "Wyprzedane"
                  : event.availableSeats.toLocaleString("pl-PL")
              }
            />
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              O wydarzeniu
            </h2>
            <p className="leading-relaxed text-gray-600">{event.description}</p>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-1 text-sm text-gray-500">Cena za bilet</p>
            <p className="text-3xl font-extrabold text-gray-900">
              {formatPrice(event.price)}
            </p>
          </div>

          <TicketForm
            eventId={event.id}
            price={event.price}
            availableSeats={event.availableSeats}
          />
        </aside>
      </div>
    </div>
  );
};

const InfoTile = ({
  Icon,
  label,
  value,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="rounded-xl border border-gray-100 bg-white p-4">
    <Icon size={18} className="mb-2 text-indigo-400" strokeWidth={1.75} />
    <p className="text-xs text-gray-400">{label}</p>
    <p className="mt-0.5 text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

export default EventDetail;
