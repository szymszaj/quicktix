import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Ticket, RotateCcw } from "lucide-react";
import { Button, ButtonVariant } from "@/components/atoms/Button";

export default async function AccountPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [total, refunded] = await Promise.all([
    prisma.purchase.count({ where: { userId: userId! } }),
    prisma.purchase.count({ where: { userId: userId!, status: "refunded" } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Przegląd konta
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Witaj, {session?.user?.name ?? session?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          Icon={Ticket}
          label="Kupione bilety"
          value={total - refunded}
          href="/account/tickets"
        />
        <StatCard
          Icon={RotateCcw}
          label="Zwroty"
          value={refunded}
          href="/account/returns"
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Szybkie akcje
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button href="/" size="sm">
            Przeglądaj wydarzenia
          </Button>
          <Button
            href="/account/tickets"
            size="sm"
            variant={ButtonVariant.SECONDARY}
            className="border-gray-200"
          >
            Moje bilety
          </Button>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({
  Icon,
  label,
  value,
  href,
}: {
  Icon: React.ElementType;
  label: string;
  value: number;
  href: string;
}) => (
  <a
    href={href}
    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
      <Icon size={22} className="text-orange-500" />
    </div>
    <div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </a>
);
