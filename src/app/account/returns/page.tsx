import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RotateCcw } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import { ReturnButton } from "./ReturnButton";

export default async function ReturnsPage() {
  const session = await auth();
  const purchases = await prisma.purchase.findMany({
    where: { userId: session?.user?.id! },
    orderBy: { createdAt: "desc" },
  });

  const active = purchases.filter((p) => p.status === "active");
  const refunded = purchases.filter((p) => p.status === "refunded");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Zwroty</h1>
        <p className="mt-1 text-sm text-gray-400">
          Możesz złożyć wniosek o zwrot aktywnych biletów.
        </p>
      </div>

      {active.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Aktywne bilety
          </h2>
          {active.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-900">{p.eventTitle}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {p.quantity} {p.quantity === 1 ? "bilet" : "bilety"} · {formatPrice(p.totalPrice)}
                </p>
                <p className="mt-0.5 font-mono text-xs text-gray-400">{p.ticketCode}</p>
              </div>
              <ReturnButton purchaseId={p.id} />
            </div>
          ))}
        </div>
      )}

      {refunded.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
            Historia zwrotów
          </h2>
          {refunded.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 opacity-60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-gray-700">{p.eventTitle}</p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Zwrot złożony {formatDate(p.createdAt.toISOString())}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <RotateCcw size={14} />
                Zwrócono
              </div>
            </div>
          ))}
        </div>
      )}

      {purchases.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
          <RotateCcw size={40} strokeWidth={1.5} className="text-gray-300" />
          <p className="text-gray-400">Brak biletów do zwrotu.</p>
        </div>
      )}
    </div>
  );
}
