import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Ticket, TicketX } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";

export default async function TicketsPage() {
  const session = await auth();
  const purchases = await prisma.purchase.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Moje bilety</h1>

      {purchases.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
          <TicketX size={40} strokeWidth={1.5} className="text-gray-300" />
          <p className="text-gray-400">Nie masz jeszcze żadnych biletów.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <Ticket size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{p.eventTitle}</p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {p.quantity} {p.quantity === 1 ? "bilet" : "bilety"} ·{" "}
                    {formatPrice(p.totalPrice)} ·{" "}
                    {formatDate(p.createdAt.toISOString())}
                  </p>
                  <p className="mt-1.5 font-mono text-sm font-bold tracking-widest text-orange-500">
                    {p.ticketCode}
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  "self-start rounded-full px-3 py-1 text-xs font-semibold sm:self-center",
                  p.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500",
                )}
              >
                {p.status === "active" ? "Aktywny" : "Zwrócony"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
